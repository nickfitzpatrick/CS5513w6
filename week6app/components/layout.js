import Head from "next/head";
import Link from "next/link";

export default function Layout({children, home}) {
    return (
        <div>
            <Head>
                <title>Dynamic Routing App</title>
            </Head>
            <header>
                <p>Week 4: Assignment 5: Draft Basic Full-Stack App</p>
            </header>
            <main>
                {children}
            </main>
            {!home && (
                <Link href="/" className="btn btn-primary mt-3">
                    Back to Home
                </Link>
                )
            }
            <footer>
                <p>Nick Fitpatrick Fall 2024 CS55.13 </p>
            </footer>
        </div>
    );
}