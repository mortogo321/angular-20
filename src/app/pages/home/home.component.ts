import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <div class="home-container">
      <h2>Welcome to Angular 20 Feature Demo</h2>
      <p class="intro">This demo showcases the most important features introduced in Angular 20.</p>

      <div class="features-grid">
        <div class="feature-card">
          <h3>🎯 Signals</h3>
          <p>Angular's new reactive primitive for building efficient, reactive applications with fine-grained reactivity.</p>
          <a routerLink="/signals" class="btn">Explore Signals →</a>
        </div>

        <div class="feature-card">
          <h3>🔄 Control Flow</h3>
          <p>New built-in control flow syntax (at-if, at-for, at-switch) that replaces structural directives with better performance.</p>
          <a routerLink="/control-flow" class="btn">See Control Flow →</a>
        </div>

        <div class="feature-card">
          <h3>⏱️ Defer Loading</h3>
          <p>Declarative lazy loading with at-defer blocks for optimized initial bundle size and better performance.</p>
          <a routerLink="/defer" class="btn">View Defer Loading →</a>
        </div>

        <div class="feature-card">
          <h3>📥 Signal Inputs</h3>
          <p>Transform component inputs into signals with input() and output() functions for better reactivity.</p>
          <a routerLink="/signal-inputs" class="btn">Learn Signal I/O →</a>
        </div>
      </div>

      <div class="info-section">
        <h3>Key Improvements in Angular 20</h3>
        <ul>
          <li>🚀 <strong>Standalone Components by Default:</strong> No more NgModules required</li>
          <li>⚡ <strong>Improved Performance:</strong> Fine-grained reactivity with signals</li>
          <li>🎨 <strong>Better DX:</strong> Modern syntax and improved type safety</li>
          <li>📦 <strong>Smaller Bundles:</strong> Tree-shakeable standalone APIs</li>
          <li>🔧 <strong>Built-in Control Flow:</strong> No more *ngIf, *ngFor directives</li>
          <li>🎯 <strong>Signal-based APIs:</strong> Reactive inputs, outputs, and state management</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      animation: fadeIn 0.5s ease-in;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    h2 {
      font-size: 2rem;
      color: #212529;
      margin-bottom: 1rem;
    }

    .intro {
      font-size: 1.2rem;
      color: #6c757d;
      margin-bottom: 2rem;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }

    .feature-card {
      background: white;
      border: 2px solid #e9ecef;
      border-radius: 12px;
      padding: 1.5rem;
      transition: all 0.3s ease;
    }

    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      border-color: #667eea;
    }

    .feature-card h3 {
      margin: 0 0 1rem 0;
      font-size: 1.5rem;
      color: #212529;
    }

    .feature-card p {
      color: #6c757d;
      margin-bottom: 1rem;
      line-height: 1.6;
    }

    .btn {
      display: inline-block;
      padding: 0.5rem 1rem;
      background: #667eea;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 500;
      transition: background 0.3s ease;
    }

    .btn:hover {
      background: #5568d3;
    }

    .info-section {
      background: #f8f9fa;
      border-radius: 12px;
      padding: 2rem;
      border-left: 4px solid #667eea;
    }

    .info-section h3 {
      margin-top: 0;
      color: #212529;
      font-size: 1.5rem;
    }

    .info-section ul {
      list-style: none;
      padding: 0;
    }

    .info-section li {
      padding: 0.75rem 0;
      color: #495057;
      font-size: 1.05rem;
      line-height: 1.6;
    }

    .info-section strong {
      color: #212529;
    }
  `]
})
export class HomeComponent {}
