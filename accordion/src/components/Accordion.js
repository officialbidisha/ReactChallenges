import { createContext, useState, useContext, useRef, useEffect,useMemo } from "react";

const AccordionContext = createContext();

const Accordion = ({ children, ...restProps }) => {
  return (
    <div className="container" {...restProps}>
      <div className="inner">{children}</div>
    </div>
  );
};

const AccordionTitle = ({ children, ...restProps }) => {
  return (
    <div className="title" {...restProps}>
      {children}
    </div>
  );
};
Accordion.Title = AccordionTitle;

const AccordionItem = function ({ children, ...restProps }) {
  const [isOpen, setIsOpen] = useState(false); // Local state inside Accordion.Item


  const toggleItem = () => {
    setIsOpen((prev) => !prev); // Toggle the open/close state
  };
  const contextValue = useMemo(() => ({ isOpen, toggleItem }), [isOpen]);


  return (
    <AccordionContext.Provider value={contextValue}>
      <div className="accordion-item" {...restProps}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

Accordion.Item = AccordionItem;

const AccordionHeader = function ({ children, ...restProps }) {
  const { isOpen, toggleItem } = useContext(AccordionContext);
  const {onToggle} = {...restProps};
  const componentJustMounted = useRef(true); // Ref to track if it's the first render

  // Effect to handle calling onToggle when the toggle state changes, except on the first render
  useEffect(() => {
    if (!componentJustMounted.current) {
      onToggle(isOpen); // Call the provided onToggle callback with the current toggle state
    } else {
      componentJustMounted.current = false; // After the first render, mark as no longer just mounted
    }
  }, [isOpen, onToggle]); // Run this effect when toggleShow or onToggle changes

  return (
    <div className="header" onClick={toggleItem} {...restProps}>
      {children}
      <span>{isOpen ? "-" : "+"}</span> {/* Show open/close indicator */}
    </div>
  );
};

Accordion.Header = AccordionHeader

const AccordionBody = function ({ children, ...restProps }) {
  const { isOpen } = useContext(AccordionContext);

  return isOpen ? (
    <div className="body" {...restProps}>
      {children}
    </div>
  ) : null; // Only render the body if the accordion is open
};

Accordion.Body = AccordionBody

export default Accordion;
