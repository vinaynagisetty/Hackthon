import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JmxComponent } from './jmx.component';

describe('JmxComponent', () => {
  let component: JmxComponent;
  let fixture: ComponentFixture<JmxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JmxComponent]
    });
    fixture = TestBed.createComponent(JmxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
