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
        width: 600,
        height: 600,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));



export default function Home() {
    const [ session, loading ] = useSession()
    const classes = useStyles();
    const { data, error } = useSWR(` 
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
        }
  }
       
    `, fetcher)
  let tileData = []
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Phone Catalog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
          <Container className={classes.root}>
              <h1 className={styles.title}>
                  Phone Catalog
              </h1>

              <ImageList rowHeight={550} className={classes.imageList}>

                  {(data?.getAllPhones || []).map((item) => (
                      <ImageListItem key={item.id}>
                          <img src={item.imageFileName} alt={item.name} />
                          <ImageListItemBar
                              title={item.title}
                              subtitle={<span>by: {item.manufacturer}</span>}
                              actionIcon={
                                  <IconButton aria-label={`${item.description}`} className={classes.icon}>
                                      <InfoIcon />
                                  </IconButton>
                              }
                          />
                      </ImageListItem>
                  ))}
              </ImageList>


              {!session && <>
                  <Button color={"primary"} variant={"contained"} onClick={() => signIn()}>Sign in</Button>
              </>}

              {session && <>
                  <br/>
                  <div style={{textAlign:'center', fontSize:'larger'}}>
                      Signed in as {session?.user?.email}
                  </div>
                  <br/>
                  <Button color={"primary"} variant={"contained"} onClick={() => signOut()}>Sign out</Button>
              </>}
          </Container>


      </main>


    </div>
  )
}
