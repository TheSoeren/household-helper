import { NextURL } from 'next/dist/server/web/next-url'
import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { headers, page } = req
  const basicAuth = headers.get('authorization')

  /*
   * If the requested url is not a page or if it is an auth page, do not check for authentication.
   * The undefined check allows for resource loading if the user is not logged in.
   */ 
  if (!page.name || page.name.startsWith('/auth')) {
     return NextResponse.next()
  }

  // ToDo: INSERT REAL AUTHENTICATION CHECK HERE
  return NextResponse.next()

  return NextResponse.redirect('/auth/login')
}