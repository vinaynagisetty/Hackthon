import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-jmx',
  templateUrl: './jmx.component.html',
  styleUrls: ['./jmx.component.css']
})
export class JmxComponent implements OnInit {
  form!: FormGroup;
  role: any;
  projectId: any;
  jmx: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      projectname: ['', Validators.required],
      url: ['', Validators.required],
      numUsers: ['', [Validators.required, Validators.min(1)]],
      testDuration: ['', [Validators.required, Validators.min(1)]],
      rampUpTime: ['', [Validators.required, Validators.min(1)]],
      testType: ['']
    });

    this.route.params.subscribe((params) => {
      this.projectId = params['projectId'];
      console.log(this.projectId);

      // Load JMX data for the specified projectId
      this.loadJmxData(this.projectId);
    });

    this.role = localStorage.getItem('role');
    console.log(this.role);
  }

  loadJmxData(projectId: any) {
    let dataparams = {
      project_id: projectId
    };

    this.authService.jmxData(dataparams).subscribe((response) => {
      this.jmx= response.data;
      console.log(this.jmx);

      // After loading data, patch the form fields
      this.patchFormWithJmxData(this.jmx);
    });
  }

  patchFormWithJmxData(jmx:any) {
    console.log(jmx[0])
    
      this.form.patchValue({
        projectname: jmx[0].Project_name,
        url: jmx[0].Project_url ,
        numUsers: jmx[0].number_of_users,
        testDuration: jmx[0].test_duration,
        rampUpTime: jmx[0].ramp_up_time,
        testType: jmx[0].test_type
      });
  
  }
  create(details:any) {
    if (this.form.valid) {
      
    

      // this.As.signUp(user).subscribe(response => {
      // Convert form data to JMX XML string
      const jmxContent = this.convertToJMX(this.form.value);
  
      // Create a Blob containing the JMX XML content
      const blob = new Blob([jmxContent], { type: 'application/xml' });
  
      // Create a URL for the Blob
      const url = window.URL.createObjectURL(blob);
  
      // Create a download link
      const a = document.createElement('a');
      a.href = url;
      a.download = 'project.jmx'; // Specify the filename with the .jmx extension
  
      // Trigger the download
      a.click();
  
      // Release the Blob URL
      window.URL.revokeObjectURL(url);
    } else {
      // Handle form validation errors
    }
  }
  
  // Function to convert form data to JMX format
  // Function to convert form data to JMX format
// Function to convert form data to JMX format
// Function to convert form data to JMX format
convertToJMX(formData: any): string {
  // Create JMX XML content based on form data
  let jmxXML = `<?xml version="1.0" encoding="UTF-8"?>
  <jmeterTestPlan version="1.2" properties="5.0" jmeter="5.6.2">
    <hashTree>
      <TestPlan guiclass="TestPlanGui" testclass="TestPlan" testname="Test Plan" enabled="true">
        <boolProp name="TestPlan.functional_mode">false</boolProp>
        <boolProp name="TestPlan.tearDown_on_shutdown">false</boolProp>
        <boolProp name="TestPlan.serialize_threadgroups">false</boolProp>
        <elementProp name="TestPlan.user_defined_variables" elementType="Arguments" guiclass="ArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
          <collectionProp name="Arguments.arguments"/>
        </elementProp>
      </TestPlan>
      <hashTree>
        <ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup" testname="${formData.projectname}" enabled="true">
          <stringProp name="ThreadGroup.on_sample_error">continue</stringProp>
          <elementProp name="ThreadGroup.main_controller" elementType="LoopController" guiclass="LoopControlPanel" testclass="LoopController" testname="Loop Controller" enabled="true">
            <stringProp name="LoopController.loops">1</stringProp>
            <boolProp name="LoopController.continue_forever">false</boolProp>
          </elementProp>
          <stringProp name="ThreadGroup.num_threads">${formData.numUsers}</stringProp>
          <stringProp name="ThreadGroup.ramp_time">${formData.rampUpTime}</stringProp>
          <boolProp name="ThreadGroup.delayedStart">false</boolProp>
          <boolProp name="ThreadGroup.scheduler">false</boolProp>
          <stringProp name="ThreadGroup.duration"></stringProp>
          <stringProp name="ThreadGroup.delay"></stringProp>
          <boolProp name="ThreadGroup.same_user_on_next_iteration">true</boolProp>
        </ThreadGroup>
        <hashTree>
          <HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="HTTP Request" enabled="true">
            <boolProp name="HTTPSampler.postBodyRaw">false</boolProp>
            <elementProp name="HTTPsampler.Arguments" elementType="Arguments" guiclass="HTTPArgumentsPanel" testclass="Arguments" enabled="true">
              <collectionProp name="Arguments.arguments"/>
            </elementProp>
            <stringProp name="HTTPSampler.domain">${formData.url}</stringProp>
            <stringProp name="HTTPSampler.path">/</stringProp>
            <stringProp name="HTTPSampler.method">GET</stringProp>
            <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
            <boolProp name="HTTPSampler.auto_redirects">false</boolProp>
            <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
            <boolProp name="HTTPSampler.DO_MULTIPART_POST">false</boolProp>
            <boolProp name="HTTPSampler.BROWSER_COMPATIBLE_MULTIPART">false</boolProp>
            <boolProp name="HTTPSampler.image_parser">false</boolProp>
            <boolProp name="HTTPSampler.concurrentDwn">false</boolProp>
            <stringProp name="HTTPSampler.concurrentPool">6</stringProp>
            <boolProp name="HTTPSampler.md5">false</boolProp>
            <intProp name="HTTPSampler.ipSourceType">0</intProp>
          </HTTPSamplerProxy>
          <hashTree/>
          <ResultCollector guiclass="SummaryReport" testclass="ResultCollector" testname="Summary Report" enabled="true">
            <boolProp name="ResultCollector.error_logging">false</boolProp>
            <objProp>
              <name>saveConfig</name>
              <value class="SampleSaveConfiguration">
                <time>true</time>
                <latency>true</latency>
                <timestamp>true</timestamp>
                <success>true</success>
                <label>true</label>
                <code>true</code>
                <message>true</message>
                <threadName>true</threadName>
                <dataType>true</dataType>
                <encoding>false</encoding>
                <assertions>true</assertions>
                <subresults>true</subresults>
                <responseData>false</responseData>
                <samplerData>false</samplerData>
                <xml>false</xml>
                <fieldNames>true</fieldNames>
                <responseHeaders>false</responseHeaders>
                <requestHeaders>false</requestHeaders>
                <responseDataOnError>false</responseDataOnError>
                <saveAssertionResultsFailureMessage>true</saveAssertionResultsFailureMessage>
                <assertionsResultsToSave>0</assertionsResultsToSave>
                <bytes>true</bytes>
                <sentBytes>true</sentBytes>
                <url>true</url>
                <threadCounts>true</threadCounts>
                <idleTime>true</idleTime>
                <connectTime>true</connectTime>
              </value>
            </objProp>
            <stringProp name="filename"></stringProp>
          </ResultCollector>
          <hashTree/>
          <ResultCollector guiclass="ViewResultsFullVisualizer" testclass="ResultCollector" testname="View Results Tree" enabled="true">
            <boolProp name="ResultCollector.error_logging">false</boolProp>
            <objProp>
              <name>saveConfig</name>
              <value class="SampleSaveConfiguration">
                <time>true</time>
                <latency>true</latency>
                <timestamp>true</timestamp>
                <success>true</success>
                <label>true</label>
                <code>true</code>
                <message>true</message>
                <threadName>true</threadName>
                <dataType>true</dataType>
                <encoding>false</encoding>
                <assertions>true</assertions>
                <subresults>true</subresults>
                <responseData>false</responseData>
                <samplerData>false</samplerData>
                <xml>false</xml>
                <fieldNames>true</fieldNames>
                <responseHeaders>false</responseHeaders>
                <requestHeaders>false</requestHeaders>
                <responseDataOnError>false</responseDataOnError>
                <saveAssertionResultsFailureMessage>true</saveAssertionResultsFailureMessage>
                <assertionsResultsToSave>0</assertionsResultsToSave>
                <bytes>true</bytes>
                <sentBytes>true</sentBytes>
                <url>true</url>
                <threadCounts>true</threadCounts>
                <idleTime>true</idleTime>
                <connectTime>true</connectTime>
              </value>
            </objProp>
            <stringProp name="filename"></stringProp>
          </ResultCollector>
          <hashTree/>
          <ResultCollector guiclass="StatVisualizer" testclass="ResultCollector" testname="Aggregate Report" enabled="true">
            <boolProp name="ResultCollector.error_logging">false</boolProp>
            <objProp>
              <name>saveConfig</name>
              <value class="SampleSaveConfiguration">
                <time>true</time>
                <latency>true</latency>
                <timestamp>true</timestamp>
                <success>true</success>
                <label>true</label>
                <code>true</code>
                <message>true</message>
                <threadName>true</threadName>
                <dataType>true</dataType>
                <encoding>false</encoding>
                <assertions>true</assertions>
                <subresults>true</subresults>
                <responseData>false</responseData>
                <samplerData>false</samplerData>
                <xml>false</xml>
                <fieldNames>true</fieldNames>
                <responseHeaders>false</responseHeaders>
                <requestHeaders>false</requestHeaders>
                <responseDataOnError>false</responseDataOnError>
                <saveAssertionResultsFailureMessage>true</saveAssertionResultsFailureMessage>
                <assertionsResultsToSave>0</assertionsResultsToSave>
                <bytes>true</bytes>
                <sentBytes>true</sentBytes>
                <url>true</url>
                <threadCounts>true</threadCounts>
                <idleTime>true</idleTime>
                <connectTime>true</connectTime>
              </value>
            </objProp>
            <stringProp name="filename"></stringProp>
          </ResultCollector>
          <hashTree/>
        </hashTree>
      </hashTree>
    </hashTree>
  </jmeterTestPlan>
  
  `;

  return jmxXML;
}





}
