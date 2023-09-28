
const WrapH2WithDiv = ({ children }) => {
  const wrappedChildren = [];
  let currentWrapper = null;

  React.Children.forEach(children, (child) => {
    if (child.type === 'h2') {
      if (currentWrapper) {
        // Close the previous wrapper and push it to the array
        wrappedChildren.push(currentWrapper);
      }
      // Create a new wrapper for the <h2> element
      currentWrapper = (
        <div className="card-view-content">
          {child}
        </div>
      );
    } else {
      if (currentWrapper) {
        // Append the child to the current wrapper
        currentWrapper = React.cloneElement(currentWrapper, {
          children: [...React.Children.toArray(currentWrapper.props.children), child],
        });
      } else {
        // If there's no current wrapper, push the child directly
        wrappedChildren.push(child);
      }
    }
  });

  // Push the last wrapper (if exists) to the array
  if (currentWrapper) {
    wrappedChildren.push(currentWrapper);
  }

        
        return <><div className="card-view-content">{wrappedChildren}</div></>;
};

export default WrapH2WithDiv;
