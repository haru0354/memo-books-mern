const TableOfContents = ({ chapter }) => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="table-of-contents">
      <p>目次</p>
      <ul>
        {chapter.contents.map((content) => {
          return <li key={content._id} onClick={() => scrollToSection(content._id)}>{content.heading_title}</li>;
        })}
      </ul>
    </div>
  );
};

export default TableOfContents;
