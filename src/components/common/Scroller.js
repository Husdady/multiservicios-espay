// React
import { useState, useCallback, useMemo } from "react";

// Librarys
import InfiniteScroll from "react-infinite-scroll-component";

// Components
import { Button } from "@common";

const Scroller = ({ children, className, limit, onLoadMore, loadMoreButton }) => {
  const [state, setState] = useState({
    skip: limit,
    hasMore: true,
  })

  // Saltar elementos
  const skipMore = useCallback(() => {
  	setState((currentState) => ({
      ...currentState,
      skip: currentState.skip + limit
    }));
  }, [state])

  // Ocultar botón que carga más items
  const hideLoadMoreButton = useCallback(() => {
    setState((currentState) => ({ ...currentState,  hasMore: false }));
  }, [])

  // Cargar más items
 	const handleLoadMore = useCallback(({ showLoading, hideLoading }) => {
 		return onLoadMore({
 			limit: limit,
 			skip: state.skip,
 			skipMore: skipMore,
 			showLoading: showLoading,
 			hideLoading: hideLoading,
 			hideLoadMoreButton: hideLoadMoreButton,
 		})
 	}, [state.skip])

  // Renderizar botón que carga más items
  const renderLoadMoreButton = useMemo(() => {
    if (!state.hasMore) return;

    return (
      <Button
        {...loadMoreButton}
        icon='angle-double-down'
        onClick={handleLoadMore}
        executeAgainEventClick={[state.skip]}
        backgroundColor={loadMoreButton?.backgroundColor}
      />
    )
  }, [state])

  return (
    <InfiniteScroll
      className={className}
      hasMore={state.hasMore}
      dataLength={state.skip}
    >
      {/* Items */}
      {children}

      {/* Botón para cargar más items */}
      {renderLoadMoreButton}
    </InfiniteScroll>
  )
}

export default Scroller;

Scroller.defaultProps = {
  limit: 10,
  loadMoreButton: {},
  onMount: function() { return null },
  onLoadMore: function() { return null },
}
