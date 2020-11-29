import { Observer, ReplaySubject, Observable } from "rxjs";
import { MathContent } from "./MathJaxWrapper";
import { Injectable } from '@angular/core';

// see https://stackoverflow.com/a/12709880/1203690
declare global {
    interface Window {
      hubReady: Observer<boolean>;
    }
  }
  
  @Injectable()
  export class MathServiceImpl {
    private readonly notifier: ReplaySubject<boolean>;
  
    constructor() {
      this.notifier = new ReplaySubject<boolean>();
      window.hubReady = this.notifier; // as said, bind to window object
      // see https://docs.mathjax.org/en/latest/advanced/dynamic.html
      const script = document.createElement('script') as HTMLScriptElement;
      script.type = 'text/javascript';
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML';
      script.async = true;
  
      document.getElementsByTagName('head')[0].appendChild(script);
  
      const config = document.createElement('script') as HTMLScriptElement;
      config.type = 'text/x-mathjax-config';
      // register notifier to StartupHook and trigger .next() for all subscribers
      config.text = `
      MathJax.Hub.Config({
          skipStartupTypeset: true,
          tex2jax: { inlineMath: [["$", "$"]],displayMath:[["$$", "$$"]] }
        });
        MathJax.Hub.Register.StartupHook('End', () => {
          window.hubReady.next();
          window.hubReady.complete();
        });
      `;
  
      document.getElementsByTagName('head')[0].appendChild(config);
    }
  
    ready(): Observable<boolean> {
      return this.notifier;
    }
  
    render(element: HTMLElement, math?: MathContent): void {
      element.parentElement.style.transition = 'opacity 150ms linear';
      element.parentElement.style.opacity = '0%';
      setTimeout(() => {
        if (math) {
          if (math.latex) {
            element.innerText = math.latex;
          } else {
            element.innerHTML = math.mathml;
          }
        }  
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, element]);
        setTimeout(() => {
          element.parentElement.style.opacity = '100%';
        }, 300);
      }, 150)
    }
  }