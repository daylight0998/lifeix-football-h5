/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { CompetitionComponent } from './competition.component';

describe('Component: Competition', () => {
  it('should create an instance', () => {
    let component = new CompetitionComponent();
    expect(component).toBeTruthy();
  });
});
