import { APPLICATIION_NAME } from "../../../config.js";
import { EmailSubjectEnum } from "../../enum/email.enum.js";

export const templates = {
  [EmailSubjectEnum.CONFIRM_EMAIL]: ({ data, subject }) => {
    return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f2f3f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f2f3f5; padding: 40px 15px;">
    <tr>
      <td align="center">
        <!-- الحاوية الرئيسية ذات الزوايا الدائرية -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 540px; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06); padding: 40px 30px;">
          
          <!-- رابط أيقونة الـ CDN -->
          <tr>
            <td align="center" style="padding-bottom: 25px;">
              <img src="https://cdn-icons-png.flaticon.com/512/9437/9437533.png" alt="Icon" width="48" height="48" style="display: block; border: 0; outline: none; text-decoration: none;">
            </td>
          </tr>

          <!-- العنوان الرئيسي -->
          <tr>
            <td align="center" style="padding-bottom: 20px;">
              <h1 style="margin: 0; font-size: 26px; font-weight: 500; color: #486581; letter-spacing: -0.5px;">${subject}</h1>
            </td>
          </tr>

          <!-- نص التحية والتعليمات -->
          <tr>
            <td align="center" style="padding-bottom: 30px; color: #4a5568; font-size: 15px; line-height: 1.6;">
              <p style="margin: 0 0 8px; font-size: 16px;">مرحباً ${data.userName}،</p>
              <p style="margin: 0;">قم بتأكيد بريدك الإلكتروني بالضغط على الزر أدناه لتسجيل الدخول على هذا الجهاز.</p>
            </td>
          </tr>

          <!-- زر التأكيد -->
          <tr>
            <td align="center" style="padding-bottom: 35px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center" style="border-radius: 8px; background-color: #b84a44;">
                    <a href="{{CONFIRMATION_URL}}" target="_blank" style="display: inline-block; padding: 14px 44px; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 8px;">${subject}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- نص إدخال الكود يدوياً -->
          <tr>
            <td align="center" style="padding-bottom: 20px; color: #4a5568; font-size: 14px;">
              أو يمكنك نسخ ولصق هذه الأرقام داخل التطبيق:
            </td>
          </tr>

          <!-- كود الـ OTP -->
          <tr>
            <td align="center" style="padding-bottom: 35px;">
              <span style="font-size: 26px; font-weight: 700; letter-spacing: 12px; color: #2d3748; font-family: Consolas, Monaco, monospace; display: inline-block; padding-right: 12px;">${data.code}</span>
            </td>
          </tr>

          <!-- تنبيه التجاهل -->
          <tr>
            <td align="center" style="color: #718096; font-size: 13px; line-height: 1.5; border-top: 1px solid #edf2f7; padding-top: 25px;">
              إذا لم تطلب تأكيد هويتك، يمكنك تجاهل هذا البريد الإلكتروني بأمان.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  },
  [EmailSubjectEnum.FORGET_PASSWORD]: ({ data, subject }) => {
    return `<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${subject}</title>
  </head>
  <body>
    <div style="word-spacing: normal; background-color: #f1f5f9">
      <div class="adM"></div>
      <div style="background-color: #f1f5f9" role="article" lang="und" dir="auto">
        <div class="adM"></div>
        <div style="margin: 0px auto; max-width: 600px">
          <div class="adM"></div>
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%">
            <tbody>
              <tr>
                <td style="direction: ltr; font-size: 0px; padding: 32px 0 0; text-align: center">
                  <div
                    class="m_4128182534071436579mj-column-per-100"
                    style="
                      font-size: 0px;
                      text-align: left;
                      direction: ltr;
                      display: inline-block;
                      vertical-align: top;
                      width: 100%;
                    "
                  >
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="vertical-align: top"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td align="left" style="font-size: 0px; padding: 0; word-break: break-word">
                            <div
                              style="
                                font-family:
                                  -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto,
                                  &quot;Helvetica Neue&quot;, Arial, sans-serif;
                                font-size: 14px;
                                line-height: 1.6;
                                text-align: left;
                                color: #374151;
                              "
                            >
                              <div style="height: 1px"></div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          style="
            background: #ffffff;
            background-color: #ffffff;
            margin: 0px auto;
            max-width: 600px;
            border-radius: 16px;
            overflow: hidden;
          "
        >
          <table
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            style="background: #ffffff; background-color: #ffffff; width: 100%; border-collapse: separate"
          >
            <tbody>
              <tr>
                <td style="border-radius: 16px; direction: ltr; font-size: 0px; padding: 0; text-align: center">
                  <div style="margin: 0px auto; max-width: 600px">
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="width: 100%"
                    >
                      <tbody>
                        <tr>
                          <td style="direction: ltr; font-size: 0px; padding: 0; text-align: center">
                            <div
                              class="m_4128182534071436579mj-column-per-100"
                              style="
                                font-size: 0px;
                                text-align: left;
                                direction: ltr;
                                display: inline-block;
                                vertical-align: top;
                                width: 100%;
                              "
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style="vertical-align: top"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td align="left" style="font-size: 0px; padding: 0; word-break: break-word">
                                      <div
                                        style="
                                          font-family:
                                            -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto,
                                            &quot;Helvetica Neue&quot;, Arial, sans-serif;
                                          font-size: 14px;
                                          line-height: 1.6;
                                          text-align: left;
                                          color: #374151;
                                        "
                                      >
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                          <tbody>
                                            <tr>
                                              <td
                                                style="
                                                  background: linear-gradient(135deg, #00298d 0%, #00298d 100%);
                                                  padding: 40px 32px 32px;
                                                  border-radius: 16px 16px 0 0;
                                                  text-align: center;
                                                "
                                              >
                                                <img
                                                  src="https://mail.google.com/mail/u/0?ui=2&amp;ik=d27ff0ab3c&amp;attid=0.1&amp;permmsgid=msg-f:1877874467579840649&amp;th=1a0f8ce0fcdf4889&amp;view=fimg&amp;fur=ip&amp;permmsgid=msg-f:1877874467579840649&amp;sz=s0-l75-ft&amp;attbid=ANGjdJ92WbdBM842zqodK7oQcK6qedYlxvwF74Ix8Adg0wroQxGgs_Y2TGaQ4miTxpOmJQ9kDL9LAaxaWHmW7ad-o41ScnIr84bUxVnxoTWYM-ToffeBa17oyNkOb_Y&amp;disp=emb&amp;realattid=43b3c99344d8c486_0.1&amp;zw"
                                                  alt="Route"
                                                  width="100"
                                                  style="display: block; margin: 0 auto 22px; border-radius: 10px"
                                                  data-image-whitelisted=""
                                                  class="CToWUd"
                                                  data-bit="iit"
                                                />
                                                <div
                                                  style="
                                                    font-size: 11px;
                                                    color: rgba(255, 255, 255, 0.75);
                                                    text-transform: uppercase;
                                                    letter-spacing: 2px;
                                                    font-weight: 600;
                                                  "
                                                >
                                                  Assignment Feedback
                                                </div>
                                                <div
                                                  style="
                                                    margin-top: 12px;
                                                    font-size: 22px;
                                                    font-weight: 800;
                                                    color: #ffffff;
                                                    line-height: 1.3;
                                                  "
                                                >
                                                  saraha 3
                                                </div>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div style="margin: 0px auto; max-width: 600px">
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="width: 100%"
                    >
                      <tbody>
                        <tr>
                          <td style="direction: ltr; font-size: 0px; padding: 28px 32px 0; text-align: center">
                            <div
                              class="m_4128182534071436579mj-column-per-100"
                              style="
                                font-size: 0px;
                                text-align: left;
                                direction: ltr;
                                display: inline-block;
                                vertical-align: top;
                                width: 100%;
                              "
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style="vertical-align: top"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td align="left" style="font-size: 0px; padding: 0; word-break: break-word">
                                      <div
                                        style="
                                          font-family:
                                            -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto,
                                            &quot;Helvetica Neue&quot;, Arial, sans-serif;
                                          font-size: 15px;
                                          line-height: 1.7;
                                          text-align: left;
                                          color: #1f2937;
                                        "
                                      >
                                        Hi <strong>Muhammed Khaled</strong>,
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      align="left"
                                      style="font-size: 0px; padding: 10px 0 0 0; word-break: break-word"
                                    >
                                      <div
                                        style="
                                          font-family:
                                            -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto,
                                            &quot;Helvetica Neue&quot;, Arial, sans-serif;
                                          font-size: 14px;
                                          line-height: 1.7;
                                          text-align: left;
                                          color: #4b5563;
                                        "
                                      >
                                        Thanks for your commitment and submission. Here is your detailed feedback:
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div style="margin: 0px auto; max-width: 600px">
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="width: 100%"
                    >
                      <tbody>
                        <tr>
                          <td style="direction: ltr; font-size: 0px; padding: 20px 32px 8px; text-align: center">
                            <div
                              class="m_4128182534071436579mj-column-per-100"
                              style="
                                font-size: 0px;
                                text-align: left;
                                direction: ltr;
                                display: inline-block;
                                vertical-align: top;
                                width: 100%;
                              "
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style="vertical-align: top"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td align="left" style="font-size: 0px; padding: 0; word-break: break-word">
                                      <div
                                        style="
                                          font-family:
                                            -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto,
                                            &quot;Helvetica Neue&quot;, Arial, sans-serif;
                                          font-size: 14px;
                                          line-height: 1.6;
                                          text-align: left;
                                          color: #374151;
                                        "
                                      >
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                          <tbody>
                                            <tr>
                                              <td
                                                style="
                                                  background: #ecfdf5;
                                                  border: 1px solid #a7f3d0;
                                                  border-radius: 12px;
                                                  padding: 24px;
                                                  text-align: center;
                                                "
                                              >
                                                <div
                                                  style="
                                                    font-size: 11px;
                                                    font-weight: 700;
                                                    color: #6b7280;
                                                    text-transform: uppercase;
                                                    letter-spacing: 1.2px;
                                                  "
                                                >
                                                  Your Score
                                                </div>
                                                <div style="margin-top: 14px">
                                                  <span
                                                    style="
                                                      font-size: 48px;
                                                      font-weight: 800;
                                                      color: #10b981;
                                                      letter-spacing: -2px;
                                                    "
                                                    >10</span
                                                  >
                                                  <span style="font-size: 20px; color: #9ca3af; font-weight: 500">
                                                    / 10</span
                                                  >
                                                </div>
                                                <div style="margin-top: 14px">
                                                  <table
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    border="0"
                                                    align="center"
                                                    style="width: 100%"
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          style="
                                                            width: 220px;
                                                            height: 8px;
                                                            background: #e5e7eb;
                                                            border-radius: 4px;
                                                            overflow: hidden;
                                                          "
                                                        >
                                                          <div
                                                            style="
                                                              width: 100%;
                                                              height: 8px;
                                                              background: #10b981;
                                                              border-radius: 4px;
                                                            "
                                                          ></div>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  <div
                                                    style="
                                                      margin-top: 8px;
                                                      font-size: 13px;
                                                      color: #10b981;
                                                      font-weight: 700;
                                                    "
                                                  >
                                                    100%
                                                  </div>
                                                </div>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div style="margin: 0px auto; max-width: 600px">
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="width: 100%"
                    >
                      <tbody>
                        <tr>
                          <td style="direction: ltr; font-size: 0px; padding: 8px 32px 0; text-align: center">
                            <div
                              class="m_4128182534071436579mj-column-per-100"
                              style="
                                font-size: 0px;
                                text-align: left;
                                direction: ltr;
                                display: inline-block;
                                vertical-align: top;
                                width: 100%;
                              "
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style="vertical-align: top"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td align="center" style="font-size: 0px; padding: 0; word-break: break-word">
                                      <p
                                        style="
                                          border-top: solid 1px #e5e7eb;
                                          font-size: 1px;
                                          margin: 0px auto;
                                          width: 100%;
                                        "
                                      ></p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div style="margin: 0px auto; max-width: 600px">
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="width: 100%"
                    >
                      <tbody>
                        <tr>
                          <td style="direction: ltr; font-size: 0px; padding: 20px 32px; text-align: center">
                            <div
                              class="m_4128182534071436579mj-column-per-100"
                              style="
                                font-size: 0px;
                                text-align: left;
                                direction: ltr;
                                display: inline-block;
                                vertical-align: top;
                                width: 100%;
                              "
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style="vertical-align: top"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td align="center" style="font-size: 0px; padding: 0; word-break: break-word">
                                      <div
                                        style="
                                          font-family:
                                            -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto,
                                            &quot;Helvetica Neue&quot;, Arial, sans-serif;
                                          font-size: 14px;
                                          line-height: 1.6;
                                          text-align: center;
                                          color: #9ca3af;
                                        "
                                      >
                                        No specific feedback points for this submission.
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div style="margin: 0px auto; max-width: 600px">
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="width: 100%"
                    >
                      <tbody>
                        <tr>
                          <td style="direction: ltr; font-size: 0px; padding: 8px 32px 0; text-align: center">
                            <div
                              class="m_4128182534071436579mj-column-per-100"
                              style="
                                font-size: 0px;
                                text-align: left;
                                direction: ltr;
                                display: inline-block;
                                vertical-align: top;
                                width: 100%;
                              "
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style="vertical-align: top"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td align="left" style="font-size: 0px; padding: 0; word-break: break-word">
                                      <div
                                        style="
                                          font-family:
                                            -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto,
                                            &quot;Helvetica Neue&quot;, Arial, sans-serif;
                                          font-size: 14px;
                                          line-height: 1.6;
                                          text-align: left;
                                          color: #374151;
                                        "
                                      >
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                          <tbody>
                                            <tr>
                                              <td
                                                style="
                                                  background: #f0fdf4;
                                                  border: 1px solid #bbf7d0;
                                                  border-radius: 10px;
                                                  padding: 18px 20px;
                                                  text-align: center;
                                                "
                                              >
                                                <div
                                                  style="
                                                    font-size: 14px;
                                                    color: #166534;
                                                    line-height: 1.7;
                                                    font-style: italic;
                                                  "
                                                >
                                                  Your journey as a developer is taking shape. Keep building and keep
                                                  moving forward.
                                                </div>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div style="margin: 0px auto; max-width: 600px">
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="width: 100%"
                    >
                      <tbody>
                        <tr>
                          <td style="direction: ltr; font-size: 0px; padding: 16px 32px 0; text-align: center">
                            <div
                              class="m_4128182534071436579mj-column-per-100"
                              style="
                                font-size: 0px;
                                text-align: left;
                                direction: ltr;
                                display: inline-block;
                                vertical-align: top;
                                width: 100%;
                              "
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style="vertical-align: top"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td align="center" style="font-size: 0px; padding: 0; word-break: break-word">
                                      <p
                                        style="
                                          border-top: solid 1px #e5e7eb;
                                          font-size: 1px;
                                          margin: 0px auto;
                                          width: 100%;
                                        "
                                      ></p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div style="margin: 0px auto; max-width: 600px">
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="width: 100%"
                    >
                      <tbody>
                        <tr>
                          <td style="direction: ltr; font-size: 0px; padding: 20px 32px 28px; text-align: center">
                            <div
                              class="m_4128182534071436579mj-column-per-100"
                              style="
                                font-size: 0px;
                                text-align: left;
                                direction: ltr;
                                display: inline-block;
                                vertical-align: top;
                                width: 100%;
                              "
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style="vertical-align: top"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td align="left" style="font-size: 0px; padding: 0; word-break: break-word">
                                      <div
                                        style="
                                          font-family:
                                            -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto,
                                            &quot;Helvetica Neue&quot;, Arial, sans-serif;
                                          font-size: 14px;
                                          line-height: 1.6;
                                          text-align: left;
                                          color: #374151;
                                        "
                                      >
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                          <tbody>
                                            <tr>
                                              <td style="text-align: center">
                                                <div style="color: #374151; font-size: 14px; line-height: 1.7">
                                                  If you have any questions or need clarification, feel free to reach
                                                  out during office hours.
                                                </div>
                                                <div
                                                  style="
                                                    margin-top: 16px;
                                                    font-size: 15px;
                                                    font-weight: 700;
                                                    color: #1f2937;
                                                  "
                                                >
                                                  Rana Mostafa
                                                </div>
                                                <div style="font-size: 13px; color: #6b7280; margin-top: 2px">
                                                  Your Mentor
                                                </div>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td style="padding-top: 16px">
                                                <table cellpadding="0" cellspacing="0" border="0" align="center">
                                                  <tbody>
                                                    <tr>
                                                      <td style="background: #25d366; border-radius: 8px">
                                                        <a
                                                          href="https://wa.me/+201044496354"
                                                          style="
                                                            display: inline-block;
                                                            padding: 10px 24px;
                                                            font-size: 14px;
                                                            font-weight: 600;
                                                            color: #ffffff;
                                                            text-decoration: none;
                                                            font-family:
                                                              -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;,
                                                              Roboto, sans-serif;
                                                          "
                                                          target="_blank"
                                                          data-saferedirecturl="https://www.google.com/url?q=https://wa.me/%2B201044496354&amp;source=gmail&amp;ust=1791118355715000&amp;usg=AOvVaw27aTm9tHIBzQmiMs3aMwrv"
                                                        >
                                                          Chat on WhatsApp
                                                        </a>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="margin: 0px auto; max-width: 600px">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%">
            <tbody>
              <tr>
                <td style="direction: ltr; font-size: 0px; padding: 0 0 32px; text-align: center">
                  <div
                    class="m_4128182534071436579mj-column-per-100"
                    style="
                      font-size: 0px;
                      text-align: left;
                      direction: ltr;
                      display: inline-block;
                      vertical-align: top;
                      width: 100%;
                    "
                  >
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="vertical-align: top"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td align="left" style="font-size: 0px; padding: 0; word-break: break-word">
                            <div
                              style="
                                font-family:
                                  -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto,
                                  &quot;Helvetica Neue&quot;, Arial, sans-serif;
                                font-size: 14px;
                                line-height: 1.6;
                                text-align: left;
                                color: #374151;
                              "
                            >
                              <div style="height: 1px"></div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="yj6qo"></div>
          <div class="adL"></div>
        </div>
        <div class="adL"></div>
      </div>
      <div class="adL"></div>
    </div>
  </body>
</html>
`;
  },
};

export const verifyEmailTemplate = ({ data, subject }) => {
  return templates[subject]({ data, subject });
};
