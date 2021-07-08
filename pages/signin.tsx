import {Button,Container, makeStyles} from "@material-ui/core";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import {csrfToken, getSession, providers, signOut,signIn} from "next-auth/client";
import {useRouter} from "next/router";
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
    title:{
        textAlign:'center',
        margin: 0,
        lineHeight: 1.15,
        fontSize: '4rem'
    }
}));

export default function Signin({ providers, csrfToken }) {
    const classes = useStyles();
    const router = useRouter();
    return <div className={styles.container}>
        <Head>
            <title>Create Next App</title>
            <meta name="description" content="Phone Catalog" />
            <link rel="icon" href="/favicon.ico"/>
        </Head>
        <main >
            <Container className={classes.root}>
                <h1 className={classes.title}>
                   Sign-In
                </h1>


                {
                    Object.values(providers).map((provider) => {
                    if (provider?.name === "Email") {
                        return;
                    }
                    return  <Button key={provider.name} color={"primary"} variant="outlined" onClick={() => signIn(provider.id)}>
                                Sign in with {provider.name}
                            </Button>


                })
                }

                <Button color={"secondary"} variant={"outlined"} onClick={() => router.replace("/")}>Home</Button>

            </Container>
        </main>
    </div>
}


Signin.getInitialProps = async (context) => {
    const { req, res } = context;
    const session = await getSession({ req });

    if (session && res && session.accessToken) {
        res.writeHead(302, {
            Location: "/",
        });
        res.end();
        return;
    }

    return {
        session: undefined,
        providers: await providers(),
        csrfToken: await csrfToken(context),
    };
};
