const Footer = () => {
  const backgroundColor = "#000000";
  const textStyle = { fontFamily: "Alegreya Sans" }
  
  return (
    <footer className="p-4 text-center" style={{ backgroundColor }}>
			<span className="text-white" style={textStyle}>Copyright &copy; 2020 Multiservicios ESPAY</span>
		</footer>
  )
}

export default Footer;
