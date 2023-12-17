import { useRouter } from 'next/router'
import { viewLogLineById } from 'src/utils/LogsUtility'
import { useEffect, useState } from 'react'

export default function LogDetails() {
  const router = useRouter()
  const { logId } = router.query
  const [details, setDetails] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      if (logId) {
        const data = await viewLogLineById(logId)
        setDetails(data)
      }
    }

    fetchData()
  }, [logId])

  return <p>Log ID: {logId}, Details: {JSON.stringify(details)}</p>
}