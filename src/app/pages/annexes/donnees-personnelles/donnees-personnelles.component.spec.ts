import { CSP_NONCE } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonneesPersonnellesComponent } from './donnees-personnelles.component';

describe('DonneesPersonnellesComponent', () => {
  let component: DonneesPersonnellesComponent;
  let fixture: ComponentFixture<DonneesPersonnellesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonneesPersonnellesComponent],
      providers: [{ provide: CSP_NONCE, useValue: 'test-nonce' }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonneesPersonnellesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the external opt-out script after rendering with the document nonce', async () => {
    await fixture.whenStable();

    const container: HTMLElement = fixture.nativeElement;
    const script = container.querySelector<HTMLScriptElement>('#matomo-opt-out script');
    expect(script).not.toBeNull();
    expect(script?.src).toBe('https://matomo.ign.fr/index.php?module=CoreAdminHome&action=optOutJS&divId=matomo-opt-out&language=auto&showIntro=1');
    expect(script?.nonce).toBe('test-nonce');
    expect(script?.async).toBe(true);
    expect(script?.textContent).toBe('');
    fixture.detectChanges();
    expect(container.querySelectorAll('#matomo-opt-out script')).toHaveLength(1);
  });

  it('reports a script loading failure to the user', async () => {
    await fixture.whenStable();
    const logError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const container: HTMLElement = fixture.nativeElement;
    const script = container.querySelector<HTMLScriptElement>('#matomo-opt-out script');
    expect(script).not.toBeNull();
    script?.dispatchEvent(new Event('error'));
    fixture.detectChanges();

    expect(logError).toHaveBeenCalledWith('Failed to load the Matomo opt-out script.');
    expect(container.querySelector('[role="alert"]')?.textContent).toContain('Le module d’opposition Matomo n’a pas pu être chargé.');
    logError.mockRestore();
  });

  it('removes the script when leaving the page', async () => {
    await fixture.whenStable();
    const container: HTMLElement = fixture.nativeElement;
    const script = container.querySelector<HTMLScriptElement>('#matomo-opt-out script');
    expect(script).not.toBeNull();

    fixture.destroy();

    expect(script?.parentNode).toBeNull();
    expect(script?.onerror).toBeNull();
  });

  it('loads the opt-out script without a nonce when none is provided', async () => {
    fixture.destroy();
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [DonneesPersonnellesComponent],
      providers: [{ provide: CSP_NONCE, useValue: null }]
    }).compileComponents();
    fixture = TestBed.createComponent(DonneesPersonnellesComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const container: HTMLElement = fixture.nativeElement;
    const script = container.querySelector<HTMLScriptElement>('#matomo-opt-out script');
    expect(script).not.toBeNull();
    expect(script?.hasAttribute('nonce')).toBe(false);
  });
});
