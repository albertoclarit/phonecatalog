import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { signIn, signOut, useSession } from 'next-auth/client'
import {Button, Container, IconButton, makeStyles} from "@material-ui/core";
import useSWR from "swr";
import {fetcher} from "./api/utils/fetcher";
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import InfoIcon from '@material-ui/icons/Info';
import AddEditPhone from "../components/AddEditPhone";
import  dialogHook from '../lib/dialogHook'

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1,
        display:'flex',
        flexDirection:'column',
        alignContent:'center',
        justifyContent:'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    imageList: {
        width: 550,
        height: 600,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));



export default function Home() {
    const [ session, loading ] = useSession()
    const classes = useStyles();
    const showAddEditPhone = dialogHook(AddEditPhone);

    const { data, error,mutate  } = useSWR(` 
      query {
                getAllPhones{
                id 
                name
                manufacturer 
                description 
                color 
                price 
                imageFileName 
                screen 
                processor 
                ram
        }
  }
       
    `, fetcher)
  return (
    <div className={styles.container}>
      <Head>
        <title>Phone Catalog</title>
        <meta name="description" content="Phone Catalog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
          <Container className={classes.root}>
              <h1 className={styles.title}>
                  Phone Catalog
              </h1>




              {!session && <>
                  <Button color={"primary"} variant={"contained"} onClick={() => signIn()}>Sign in</Button>
              </>}

              {session && <>
                  <ImageList rowHeight={450} className={classes.imageList}>

                      {(data?.getAllPhones || []).map((item) => (
                          <ImageListItem key={item.id}>
                              <Image
                                  src={item.imageFileName || "https://temp.media/?height=600&width=350&text=Phone_Pic&category=technology&color="}
                                  alt={item.name}
                                  layout={"fill"}/>
                              <ImageListItemBar
                                  title={item.name}
                                  subtitle={<span>by: {item.manufacturer}</span>}
                                  actionIcon={
                                      <IconButton aria-label={`${item.description}`} className={classes.icon} onClick={()=>{
                                          showAddEditPhone({entity:item},(result)=>{
                                              if(result)
                                                  mutate()
                                          })
                                      }
                                      }>
                                          <InfoIcon />
                                      </IconButton>
                                  }
                              />
                          </ImageListItem>
                      ))}
                  </ImageList>
                  <br/>
                  <div style={{textAlign:'center', fontSize:'larger'}}>
                      Signed in as {session?.user?.email}
                  </div>
                  <br/>
                  <Button color={"secondary"} variant={"contained"} onClick={() =>
                      showAddEditPhone({entity:{}},(result)=>{
                          if(result)
                              mutate()
                      })
                  }>Add Phone</Button>
                  <Button color={"primary"} variant={"contained"} onClick={() => signOut()}>Sign out</Button>
              </>}
          </Container>


      </main>


    </div>
  )
}
