import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { signIn, signOut, useSession } from 'next-auth/client'
import {Button,Container, makeStyles} from "@material-ui/core";

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
}));

export default function Home() {
    const [ session, loading ] = useSession()
    const classes = useStyles();
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

              {!session && <>
                  <Button color={"primary"} variant={"contained"} onClick={() => signIn()}>Sign in</Button>
              </>}

              {session && <>
                  Signed in as {session?.user?.email} <br/>
                  <Button color={"primary"} variant={"contained"} onClick={() => signOut()}>Sign out</Button>
              </>}
          </Container>


      </main>


    </div>
  )
}
