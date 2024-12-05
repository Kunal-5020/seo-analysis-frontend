import React from "react";

const TwitterCards = ({ result }) => {
  try {
    if (!result || typeof result !== "object") {
      return <p>No data available to display.</p>;
    }

    const recommendedLengths = {
      Title: { min: 30, max: 70 },
      Description: { min: 150, max: 200 },
    };

    // Validate the Title and Description tags
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

    return (
      <div className="meta-tags-report">
        <h2>Meta Twitter Tags Report</h2>

        <div className="meta-tag-section">
          <h3>Twitter Cards</h3>
          <table>
            <thead>
              <tr>
                <th>Tag</th>
                <th>Present</th>
                <th>Content</th>
                <th>Length</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {["Title", "Description"].map((tag, index) => {
                const content = result[tag.toLowerCase()];
                const length = content?.length || 0;
                const validation =
                  tag === "Title" ? titleValidation : descriptionValidation;

                return (
                  <tr key={index}>
                    <td>{tag}</td>
                    <td>{content ? "Yes" : "No"}</td>
                    <td>{content || "Not Found"}</td>
                    <td>{length || "N/A"}</td>
                    <td>
                      <p
                        className={`output-status ${
                          validation.status === "Success" ? "success" : "failure"
                        }`}
                      >
                        {validation.status}
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
                <td><strong>Status</strong></td>
                <td>
                  <p
                    className={`output-status ${
                      titleValidation.status === "Success" &&
                      descriptionValidation.status === "Success"
                        ? "success"
                        : "failure"
                    }`}
                  >
                    {titleValidation.status === "Success" &&
                    descriptionValidation.status === "Success"
                      ? "Success"
                      : "Failure"}
                  </p>
                </td>
              </tr>
              <tr>
                <td><strong>Recommended Length</strong></td>
                <td>
                  <p>
                    Title - (30 to 70 Characters)
                    <br />
                    Description - (150 to 200 Characters)
                  </p>
                </td>
              </tr>
              <tr>
                <td><strong>Report</strong></td>
                <td>
                  {titleValidation.status === "Success" &&
                  descriptionValidation.status === "Success" ? (
                    <p>
                      This webpage includes all required Twitter tags with proper
                      formats and recommended lengths, optimizing its visibility
                      and engagement on Twitter.
                    </p>
                  ) : (
                    <p>
                      Some Twitter tags are missing or not meeting the recommended
                      lengths. Ensure all tags are properly configured for enhanced
                      visibility and engagement on Twitter.
                    </p>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <p className="question">
            <strong>Why is 'Twitter Cards' required?</strong>
          </p>
          <p className="answer">
            Implementing Twitter Cards is crucial for SEO as it enhances the
            visibility and engagement of website content shared on Twitter,
            ultimately driving traffic and improving search engine rankings.
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

export default TwitterCards;
