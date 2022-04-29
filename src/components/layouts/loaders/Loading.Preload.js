// React
import { useMemo } from 'react'

// Librarys
import Head from "next/head";

const Loading = ({ title, style }) => {
	// Renderizar título en head tag
	const renderTitle = useMemo(() => {
		if (!title) return

		return (
			<Head>
				<title>{title}</title>
			</Head>
		)
	}, [])

	return (
		<div style={style} className="w-100 h-100vh d-flex align-items-center justify-content-center background-transparent">
			{/* Renderizar título en head tag */}
			{renderTitle}

			<div className="sk-chase">
				<div className="sk-chase-dot"></div>
				<div className="sk-chase-dot"></div>
				<div className="sk-chase-dot"></div>
				<div className="sk-chase-dot"></div>
				<div className="sk-chase-dot"></div>
				<div className="sk-chase-dot"></div>
			</div>
		</div>
	)
}

export default Loading;

Loading.defaultProps = {
	title: 'Cargando...'
}
