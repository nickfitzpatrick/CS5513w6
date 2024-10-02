import Layout from "@/components/layout";
import { getSortedList } from "@/lib/data";
import Link from "next/link";

// define a getStaticProps() function 
export async function getStaticProps() {
  const allData = getSortedList();
  return {
    props: { allData }
  };
}

// exports our homepage
export default function Home( { allData } ) {
  return (
    <Layout home>
      <h1>List of Names</h1>
      <div className="list-group">
        {allData && allData.map(
            ({id,name}) => (
              <Link key={id} href={`/${id}`} className="list-group-item list-group-item-action">
                {name}
              </Link>
            )
          )
        }
      </div>
    </Layout>
  );
}