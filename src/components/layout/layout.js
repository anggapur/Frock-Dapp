import Header from '../header/header'

export default function Layout({ children }) {
  const styles = {
    paddingTop: '40px',
    paddingBottom: '80px',
  }

  return (
    <>
      <Header />
      <main style={styles}>{children}</main>
    </>
  )
}
