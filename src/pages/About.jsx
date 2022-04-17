function Paragraph({ children }) {
  return <p className="text-gray-700 my-4 leading-7 tracking-wide">{children}</p>;
}

export function About() {
  return (
    <div className="mx-auto  max-w-lg">
      <h2>About the project</h2>
      <Paragraph>
        This project was created because I wanted to learn a new language and I
        was struggling with a few hundreds of flashcards on my desk. I thought
        it would make sense to have this in a digital format so that I could
        practice.
      </Paragraph>
      <Paragraph>
        As a developer I feel the obligation of making things more challenging
        than they need to be so I decided to create a project for anyone to
        sign up and create their own flashcards
      </Paragraph>
      <Paragraph>
        I hope you enjoy this project and if you have any suggestions or
        feedback please reach out to me at{" "}
        <a className="link" target="_blank" rel="noreferrer" href="https://brunopagno.github.io">
          Bruno Pagno
        </a>
        .
      </Paragraph>
    </div>
  );
}
