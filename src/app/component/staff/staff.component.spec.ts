/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { StaffComponent } from './staff.component';

describe('Component: Staff', () => {
  it('should create an instance', () => {
    let component = new StaffComponent();
    expect(component).toBeTruthy();
  });
});
