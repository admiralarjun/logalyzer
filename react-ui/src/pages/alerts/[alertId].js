import { useRouter } from 'next/router'

export default function User() {
  const router = useRouter()
  const { alertId } = router.query

  return <p>Alert ID: {alertId}</p>
}