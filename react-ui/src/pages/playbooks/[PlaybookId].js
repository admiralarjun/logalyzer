import Head from 'next/head';
import { Typography , Box , Card } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchPlaybookById } from 'src/utils/PlaybooksUtility'; // Replace with the actual path
import ReactMarkdown from 'react-markdown';



const Page = () => {
  const [playBook, setPlayBook] = useState({});
  const router = useRouter();
  const { PlaybookId } = router.query;

  useEffect(() => {
    const fetchPlaybook = async () => {
      try {
        // Ensure playbookId is available before making the request
        if (PlaybookId) {
          const playbookData = await fetchPlaybookById(PlaybookId);
          setPlayBook(playbookData);
          console.log(playBook);
        }
      } catch (error) {
        console.error('Error fetching playbook', error);
        router.push('/404')
      }
    };

    fetchPlaybook();
  }, []); // Add playbookId to the dependency array

  return (
    <>
      <Head>
        <title>Playbook | Logalyzer</title>
      </Head>
      <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
        px: 3
      }}
    >
      <Card sx={{
        display: 'flex',
        flexDirection: 'column',
        cursor:'pointer',
        height: '100%',
        padding: '2rem'
      }}
>
      <Typography variant='h3'>Playbook for {playBook.name}</Typography>
      <ReactMarkdown>{playBook.content}</ReactMarkdown>
      </Card>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
