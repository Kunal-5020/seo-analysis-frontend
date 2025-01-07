import React from "react";

const OpenGraphs = ({ result }) => {
  try {
    if (!result || typeof result !== "object") {
      return <p>No data available to display.</p>;
    }

    const recommendedLengths = {
      Title: { min: 30, max: 70 },
      Description: { min: 150, max: 200 },
    };

    // Validate Title and Description with length checking
    const validateTag = (tag, content) => {
      const { min, max } = recommendedLengths[tag] || {};
      const length = content?.length || 0;

      if (!content) {
        return { status: "Failure", message: `${tag} tag is missing.` };
      }

      if (length < min || length > max) {
        return {
          status: "Warning",
          message: `${tag} length is out of the recommended range. Please ensure it's between ${min} and ${max} characters.`,
        };
      }

      return {
        status: "Success",
        message: `${tag} is valid with an appropriate length.`,
      };
    };

    // Validate Title and Description
    const titleValidation = validateTag("Title", result.title);
    const descriptionValidation = validateTag("Description", result.description);

    const openGraphs = [
      { tag: "Title", content: result.title, validation: titleValidation },
      { tag: "Description", content: result.description, validation: descriptionValidation },
      { tag: "Image", content: result.image },
      { tag: "Url", content: result.url },
      { tag: "Type", content: result.type },
      { tag: "Site_name", content: result.sitename },
      { tag: "Locale", content: result.locale },
    ];

    // Determine overall success based on Title and Description validation
    const allSuccess =
      titleValidation.status === "Success" && descriptionValidation.status === "Success" && openGraphs.every(({ content }) => content);

    return (
      <div className="meta-tags-report">
        <h2>Meta OpenGraphs Report</h2>

        <div className="meta-tag-section">
          <h3>OpenGraphs Card</h3>
          <table>
            <thead>
              <tr>
                <th>Tags</th>
                <th>Present</th>
                <th>Content</th>
                <th>Length</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {openGraphs.map(({ tag, content, validation }, index) => {
                const length = tag === "Title" || tag === "Description" ? content?.length || 0 : null;
                let status = "N/A";

                if (tag === "Title" || tag === "Description") {
                  status = validation.status;
                } else {
                  status = content ? "Success" : "Failure";
                }

                return (
                  <tr key={index}>
                    <td>{tag}</td>
                    <td>{content ? "Yes" : "No"}</td>
                    <td>{content || "Not Found"}</td>
                    <td>{length !== null ? length : "N/A"}</td>
                    <td>
                      <p
                        className={`output-status ${
                          status === "Success" ? "success" : status === "Warning" ? "warning" : "failure"
                        }`}
                      >
                        {status}
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <h3>Output</h3>
          <table>
            <tbody>
              <tr>
                <td>
                  <strong>Status</strong>
                </td>
                <td>
                  <p
                    className={`output-status ${
                      allSuccess ? "success" : "failure"
                    }`}
                  >
                    {allSuccess ? "Success" : "Failure"}
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Recommended Length</strong>
                </td>
                <td>
                  <p>
                    Title - (30 to 70 Characters)
                    <br />
                    Description - (150 to 200 Characters)
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Report</strong>
                </td>
                <td>
                  {allSuccess ? (
                    <p>
                      This webpage excels with all required meta Open Graph tags
                      meeting recommended standards, optimizing its visibility and
                      engagement on social media platforms.
                    </p>
                  ) : (
                    <p>
                      This site has not properly created the Open Graphs, which
                      may negatively impact visibility and engagement on social
                      media platforms.
                    </p>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <p className="question">
            <strong>Why is 'Open Graphs' required?</strong>
          </p>
          <p className="answer">
            Open Graphs are crucial for SEO as they optimize how web pages appear
            when shared on social media platforms like Facebook, increasing
            visibility and engagement potential.
          </p>
          <br />
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div>
        <h2>Error</h2>
        <p>{error.message}</p>
      </div>
    );
  }
};

export default OpenGraphs;
