import { useRef } from "react";

export const useCarousel = ({
  slideToShow,
  slideToScroll,
  gap,
  behavior = "smooth",
}: {
  slideToShow: number;
  slideToScroll: number;
  gap: number;
  behavior: ScrollBehavior;
}) => {
  const width = `calc(${100 / slideToShow}% - ${gap / 2}px)`;
  const ref = useRef<HTMLDivElement>(null);
  const onNext = () => {
    if (ref.current) {
      console.log(
        ref.current.scrollLeft +
          ((ref.current.scrollWidth +
            gap * (ref.current.childNodes.length - 1)) /
            ref.current.childNodes.length +
            gap) *
            slideToScroll
      );
    }
    ref?.current?.scroll({
      behavior,
      left:
        ref.current.scrollLeft +
        ((ref.current.scrollWidth + gap * (ref.current.childNodes.length - 1)) /
          ref.current.childNodes.length +
          gap) *
          slideToScroll,
    });
  };
  const onBack = () => {
    if (ref.current) {
      console.log(
        ref.current.scrollLeft -
          ((ref.current.scrollWidth +
            gap * (ref.current.childNodes.length - 1)) /
            ref.current.childNodes.length +
            gap) *
            slideToScroll
      );
    }
    ref?.current?.scroll({
      behavior,
      left:
        ref.current.scrollLeft -
        ((ref.current.scrollWidth + gap * (ref.current.childNodes.length - 1)) /
          ref.current.childNodes.length +
          gap) *
          slideToScroll,
    });
  };
  return { width, ref, onBack, onNext };
};
