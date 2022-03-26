import { Children, useCallback, useLayoutEffect, useState } from "react";

const useCarouselFonctions = (carousel, children, width) => {
  const [page, setPage] = useState(0);
  const [touchStart, setTouchStart] = useState();
  const [touchEnd, setTouchEnd] = useState();
  const childrensCount = Children.count(children);
  const [itemsShow, setItemsShow] = useState(0);

  // HANDLE RESPONSIVNESS
  useLayoutEffect(() => {
    if (carousel.current) {
      setItemsShow(Math.ceil(carousel.current.offsetWidth / Number(width)));
    }
  }, [carousel, width]);

  // SLIDER
  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);

  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const handleTouchEnd = () => {
    touchStart - touchEnd > 100 && updateActive(page + 1);
    touchStart - touchEnd < -100 && updateActive(page - 1);
    return;
  };

  // PAGE CHANGE
  const updateActive = useCallback(
    (newIndex) => {
      setTouchEnd();
      setTouchStart();
      if (newIndex <= 0) setPage(0);
      else if (newIndex >= childrensCount / itemsShow) setPage(0);
      else setPage(newIndex);
    },
    [childrensCount, itemsShow]
  );

  return {
    handleTouchEnd,
    handleTouchMove,
    handleTouchStart,
    page,
    itemsShow,
    updateActive,
    childrensCount,
  };
};

export default useCarouselFonctions;
