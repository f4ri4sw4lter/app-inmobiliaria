function App(){
  return(

    <button onClick={async () => {
      const response = await fetch('/api')
      const data = await response.text()
      console.log(data)
    }}>
      Click me  
    </button>
  )
}

export default App
