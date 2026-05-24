import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from './client'

const imageBuilder = createImageUrlBuilder(client)

export const urlForImage = (source: SanityImageSource) =>
  imageBuilder.image(source).auto('format').fit('max')
