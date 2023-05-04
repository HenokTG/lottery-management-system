import Head from "next/head";
import { Container, Box, Typography } from "@mui/material";

import { DashboardLayout } from "../../components/dashboard-layout";
import { bonusTransactions } from "../../__mocks__/payment-report";

const Page = ({ bonus }) => {
  const { bonusID, operatorName, playerID, remarkDetail } = bonus;
  return (
    <>
      <Head>
        <title>Bonus Terms and Services | Lottery Management System</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Box>
            <Typography sx={{ m: 1, mb: 4 }} variant="h6" align="center">
              {bonusID} : Terms and Services
            </Typography>
          </Box>

          <Box sx={{ mt: 1, mx: 20 }}>
            <Typography variant="body2" align="left" sx={{ mb: 2 }}>
              This bonus is rewarded for player named &quot;{playerID}&quot; by operator registered
              as &quot;
              {operatorName}&quot; and it has the following terms and conditions for usage by the
              player.
            </Typography>
            {remarkDetail.map((remark) => (
              <Typography key={remark.detailID} variant="body2" align="left" sx={{ mb: 2 }}>
                {remark.detail}
              </Typography>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

// export async function getServerSideProps({ params }) {
//   const termsConditions = params.termsConditions;
//   const bonusList = await bonusTransactions();

//   const bonus = bonusList[termsConditions];

//   return {
//     props: {
//       termsConditions,
//       bonus,
//     },
//   };
// }

// Compile time

export async function getStaticProps({ params }) {
  const bonuses = await bonusTransactions();

  return {
    props: {
      bonus: bonuses[params.termsConditions],
    },
  };
}

export async function getStaticPaths() {
  const bonuses = await bonusTransactions();
  return {
    paths: bonuses.map((bonus, idx) => {
      const bonusPathID = bonus.playerID.toLowerCase().replace(/ /g, "-") + `-${idx}`;
      return {
        params: {
          termsConditions: idx.toString(),
        },
      };
    }),
    fallback: false,
  };
}
