// my-awesome-reporter.ts
import {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestResult,
} from "@playwright/test/reporter";
import { MailUtil } from "./mail.util";
import { RemoveFolders } from "./file.util";

let passCount = 0;
let failCount = 0;

class MyReporter implements Reporter {
  onBegin(config: FullConfig, suite: Suite) {
    RemoveFolders();
  }

  onTestBegin(test: TestCase, result: TestResult) {
    //console.log(`Starting test ${test.title}`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    console.log(`Finished test ${test.title}: ${result.status}`);
    if ((result.status == "passed")) {
      passCount++;
    } else if ((result.status == "failed" || result.status == "timedOut")) {
      failCount++;
    }
  }

  async onEnd(result: FullResult) {
    //apiServer.close();
    const now = new Date();
    const formattedTime = now.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    console.log(
      `Finished the run at ${formattedTime} \n Pass - ${passCount} / Fail - ${failCount}`
    );

    /*const mailer = new MailUtil(
      String(process.env.EMAIL),
      String(process.env.PASSWORD)
    );
    await mailer.sendMail(
      String(process.env.TOMAIL),
      "DrDoc Test Result",
      `<div><div><b>Hi Team,</b><br><br>
                The Smoke Test Execution for DrDoc in Production Environment started at 
                <span style="color:#993300"><em>${formattedTime}</em></span>. <br>
                Please open attachment for more details. Below are the results, 
                <br><br>
                <table style="width:60%">
                <tr>
                    <td><b><span style="color:#008000">Passed</span><br aria-hidden="true"></b></td>
                    <td><b><span style="color:#ff0000">Failed</span></b><br aria-hidden="true"></b></td>
                    <td><b><span style="color:#254DEE">Total</span><br aria-hidden="true"></b></td>
                </tr>
                <tr>
                    <td><span style="color:#008000">${passCount}</span><br aria-hidden="true"></td>
                    <td><span style="color:#ff0000">${failCount}</span></b><br aria-hidden="true"></td>
                    <td><span style="color:#254DEE">${
                      passCount + failCount
                    }</span><br aria-hidden="true"></td>
                </tr>
                </table>
                <br>We are always happy to accommodate our clients with assistance <br>if necessary! Please contact the below QA Team <br>
                <a href="mailto:vdhakshnamoorthy@oaktreecapital.com " >vdhakshnamoorthy@oaktreecapital.com</a> 
                <br><br aria-hidden="true"><b>Thanks &amp; Regards, </b><br>QA Team</div></div>`
    );*/
  }
}

export default MyReporter;
