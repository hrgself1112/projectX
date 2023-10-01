import React from 'react'

const page = () => {
  return (
    <>
    <form action="/convert" method="post" enctype="multipart/form-data">
    <input type="file" name="wordFile">
    <br>
    <textarea name="convertedContent" rows="10" cols="50" readonly></textarea>
    <br>
    <input type="submit" value="Convert">
</form>

</>
  )
}

export default page