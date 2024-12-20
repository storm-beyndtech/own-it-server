
export function emailTemplate(title: string, bodyContent: string) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
      <title>${title}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        table {
          max-width: 600px;
          width: 100%;
          margin: 0 auto;
          border-spacing: 0;
        }
        img {
          max-width: 100%;
          height: auto;
          display: block;
        }
        .footer {
          font-size: 12px;
          color: #fafafa;
          background-color: #13160F;
          padding: 20px;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <table role="presentation" style="width: 100%; background-color: #f4f4f4;">
        <tr>
          <td style="padding: 20px 0;">
            <table role="presentation">
              <!-- Header Section with Logo -->
              <tr>
                <td style="background-color: #13160F; padding: 20px; text-align: center;">
                  <img src="https://firebasestorage.googleapis.com/v0/b/boldfitness-ed634.appspot.com/o/bold-fitness-logo.png" alt="BoldFitnessNG Logo" style="max-width: 100px;">
                </td>
              </tr>
              <!-- Body Content Section -->
              <tr>
                  ${bodyContent}
              </tr>
              <!-- Footer Section -->
              <tr>
                <td class="footer">
                  <img src="https://firebasestorage.googleapis.com/v0/b/boldfitness-ed634.appspot.com/o/bold-fitness-logo.png" alt="BoldFitnessNG Logo" style="max-width: 80px; margin-bottom: 10px;">
                  <p>© 2023 BoldFitnessNG | All Rights Reserved</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>    
  `;
}
