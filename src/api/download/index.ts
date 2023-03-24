interface getPageDataPropsTypes {
  filePath: string
  fileName: string
}

export const downloadFile = async (props: getPageDataPropsTypes) => {
  const { filePath, fileName } = props

  const link = document.createElement('a')
  link.setAttribute('href', `${filePath}?download&fileName=${fileName}`)
  link.setAttribute('download', fileName)
  link.innerText = 'Download PDF'
  document.body.appendChild(link)

  return link
}
