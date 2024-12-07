import { NextResponse } from "next/server";


export const POST = async(request) => {
  try {
    const { query } = await request.json();

    // user input  ex; 1508 Greenwood Ave, we really only care about the streetname and address
    const addressInfo = query.split(" ")

    console.log(addressInfo)

    const addressNumber = addressInfo[0] * 1 || null
    const addressName = addressInfo[1] || null

    const response = await fetch(`https://data.lacity.org/resource/4ca8-mxuh.json?$query=SELECT%20%60hse_nbr%60,%20%60str_nm%60,%20%60str_sfx_cd%60,%20%60zip_cd%60,%20%60lat%60,%20%60lon%60%20WHERE%20%60hse_nbr%60%20=%20${addressNumber}%20OR%20LOWER(%60str_nm%60)%20LIKE%20%22%25${addressName}%25%22%20LIMIT%2010`)

    const data = await response.json();

  //   {
  //     "hse_nbr": "1769",
  //     "str_nm": "IVAR",
  //     "str_sfx_cd": "AVE",
  //     "zip_cd": "90028",
  //     "lat": "34.10369",
  //     "lon": "-118.32831"
  // },

    // Putting together the addresses 
    const addressData = data.map(dataRow => {
      const {hse_nbr, str_nm, str_sfx_cd, zip_cd, lat, lon} = dataRow
      const address = `${hse_nbr} ${str_nm} ${str_sfx_cd} ${zip_cd}`
      return {address: address, coordinates: {lat, lon}}
    })

    return NextResponse.json({addressData})

  } catch (error) {
    return NextResponse.json({error})
  }
}