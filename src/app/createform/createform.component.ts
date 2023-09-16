import { ImplicitReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-createform',
  templateUrl: './createform.component.html',
  styleUrls: ['./createform.component.css']
})
export class CreateformComponent implements OnInit   {
  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      projectname:['',Validators.required],
      url: ['', Validators.required],
      numUsers: ['', [Validators.required, Validators.min(1)]],
      testDuration: ['', [Validators.required, Validators.min(1)]],
      rampUpTime: ['', [Validators.required, Validators.min(1)]],
      testType: ['', Validators.required]
    });
  }
  // create(){
  //   if (this.form.valid) {
  //     // You can access form values using this.form.value
  //     const formData = this.form.value;
  //     console.log('Form Data:', formData);

  //     // Add your logic to start the password reset test here
  //   } else {
  //     // Form is not valid, display error messages or take appropriate action
  //   }
  // }
  create() {
    if (this.form.valid) {
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
<jmeterTestPlan version="1.2" properties="2.4" jmeter="5.4.2">
  <hashTree>
    <TestPlan guiclass="TestPlanGui" testclass="TestPlan" testname="${formData.projectname}" enabled="true">
      <stringProp name="TestPlan.comments"></stringProp>
      <boolProp name="TestPlan.functional_mode">false</boolProp>
      <boolProp name="TestPlan.serialize_threadgroups">false</boolProp>
      <elementProp name="TestPlan.user_defined_variables" elementType="Arguments">
        <collectionProp name="Arguments.arguments">
          <!-- Add user-defined variable for BASE_URL -->
          <elementProp name="" elementType="Argument">
            <stringProp name="Argument.name">BASE_URL</stringProp>
            <stringProp name="Argument.value">${formData.url}</stringProp>
          </elementProp>
        </collectionProp>
      </elementProp>
      <stringProp name="TestPlan.user_define_classpath"></stringProp>
    </TestPlan>
    <hashTree>
      <HeaderManager guiclass="HeaderPanel" testclass="HeaderManager" testname="HTTP Header manager">
        <collectionProp name="HeaderManager.headers">
          <!-- Add your HTTP headers based on form data -->
          <elementProp name="sec-ch-ua" elementType="Header">
            <stringProp name="Header.name">sec-ch-ua</stringProp>
            <stringProp name="Header.value">${formData.secChUa}</stringProp>
          </elementProp>
          <elementProp name="sec-ch-ua-mobile" elementType="Header">
            <stringProp name="Header.name">sec-ch-ua-mobile</stringProp>
            <stringProp name="Header.value">${formData.secChUaMobile}</stringProp>
          </elementProp>
          <!-- Add other headers as needed -->
        </collectionProp>
      </HeaderManager>
      <hashTree/>
      <Arguments guiclass="ArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
        <collectionProp name="Arguments.arguments">
          <!-- Add user-defined variable for numUsers -->
          <elementProp name="numUsers" elementType="Argument">
            <stringProp name="Argument.name">numUsers</stringProp>
            <stringProp name="Argument.value">${formData.numUsers}</stringProp>
          </elementProp>
          <!-- Add user-defined variable for testDuration -->
          <elementProp name="testDuration" elementType="Argument">
            <stringProp name="Argument.name">testDuration</stringProp>
            <stringProp name="Argument.value">${formData.testDuration}</stringProp>
          </elementProp>
          <!-- Add user-defined variable for rampUpTime -->
          <elementProp name="rampUpTime" elementType="Argument">
            <stringProp name="Argument.name">rampUpTime</stringProp>
            <stringProp name="Argument.value">${formData.rampUpTime}</stringProp>
          </elementProp>
          <!-- Add user-defined variable for testType -->
          <elementProp name="testType" elementType="Argument">
            <stringProp name="Argument.name">testType</stringProp>
            <stringProp name="Argument.value">${formData.testType}</stringProp>
          </elementProp>
        </collectionProp>
      </Arguments>
      <hashTree/>
      <ConfigTestElement guiclass="HttpDefaultsGui" testclass="ConfigTestElement" testname="HTTP Request Defaults" enabled="true">
        <elementProp name="HTTPsampler.Arguments" elementType="Arguments">
          <collectionProp name="Arguments.arguments"/>
        </elementProp>
        <boolProp name="HTTPSampler.concurrentDwn">true</boolProp>
        <boolProp name="HTTPSampler.image_parser">true</boolProp>
        <intProp name="HTTPSampler.concurrentPool">6</intProp>
      </ConfigTestElement>
      <hashTree/>
      <ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup" testname="Thread Group" enabled="true">
        <stringProp name="ThreadGroup.on_sample_error">continue</stringProp>
        <elementProp name="ThreadGroup.main_controller" elementType="LoopController">
          <boolProp name="LoopController.continue_forever">false</boolProp>
          <stringProp name="LoopController.loops">1</stringProp>
        </elementProp>
        <intProp name="ThreadGroup.num_threads">1</intProp>
        <intProp name="ThreadGroup.ramp_time">1</intProp>
        <boolProp name="ThreadGroup.scheduler">false</boolProp>
        <longProp name="ThreadGroup.duration">0</longProp>
        <longProp name="ThreadGroup.delay">0</longProp>
      </ThreadGroup>
      <hashTree>
        <HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="${formData.projectname}" enabled="true">
          <elementProp name="HTTPsampler.Arguments" elementType="Arguments">
            <collectionProp name="Arguments.arguments"/>
          </elementProp>
          <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
          <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
          <stringProp name="HTTPSampler.protocol">https</stringProp>
          <stringProp name="HTTPSampler.domain">${formData.url}</stringProp>
          <intProp name="HTTPSampler.port">0</intProp>
          <stringProp name="HTTPSampler.path"></stringProp>
          <stringProp name="HTTPSampler.method">GET</stringProp>
        </HTTPSamplerProxy>
        <hashTree>
          <UniformRandomTimer guiclass="UniformRandomTimerGui" testclass="UniformRandomTimer" testname="Uniform Random Timer" enabled="true">
            <doubleProp>
              <name>RandomTimer.range</name>
              <value>0.0</value>
              <savedValue>0.0</savedValue>
            </doubleProp>
            <stringProp name="ConstantTimer.delay">0</stringProp>
            <stringProp name="TestPlan.comments">Recorded time was 0 milliseconds</stringProp>
          </UniformRandomTimer>
          <hashTree/>
        </hashTree>
      </hashTree>
    </hashTree>
  </hashTree>
</jmeterTestPlan>`;

  return jmxXML;
}



  

}
