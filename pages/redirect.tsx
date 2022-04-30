import React from 'react'

export async function getServerSideProps(context) {

      return {
        redirect: {
          destination: 'https://www.google.com',
          permanent: false,
        },
      }
    }



function redirect() {
  return (
    <div>redirect</div>
  )
}

export default redirect