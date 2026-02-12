import Button from './Button';

export default function ButtonDemo() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f8f9fa',
      padding: '4rem 2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto',
        background: '#ffffff',
        borderRadius: '16px',
        padding: '3rem',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
      }}>
        {/* Header */}
        <div style={{ 
          borderBottom: '2px solid #e5e7eb',
          paddingBottom: '2rem',
          marginBottom: '3rem'
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '800',
            marginBottom: '0.5rem',
            color: '#102B32',
            letterSpacing: '-0.02em'
          }}>
            Arrow Button Component
          </h1>
          <p style={{ 
            color: '#6b7280', 
            fontSize: '1.125rem'
          }}>
            Animated arrow buttons with multiple variants and customization options
          </p>
        </div>

        {/* Variants - Filled */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '700',
            marginBottom: '1.5rem',
            color: '#102B32'
          }}>
            Filled Variants
          </h2>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="accent">Accent Button</Button>
          </div>
        </section>

        {/* Variants - Outline */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '700',
            marginBottom: '1.5rem',
            color: '#102B32'
          }}>
            Outline Variants
          </h2>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <Button variant="outline-primary">Outline Primary</Button>
            <Button variant="outline-secondary">Outline Secondary</Button>
            <Button variant="outline-accent">Outline Accent</Button>
            <Button variant="ghost">Ghost Button</Button>
          </div>
        </section>

        {/* Sizes */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '700',
            marginBottom: '1.5rem',
            color: '#102B32'
          }}>
            Button Sizes
          </h2>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center'
          }}>
            <Button size="sm">Small Button</Button>
            <Button size="md">Medium Button</Button>
            <Button size="lg">Large Button</Button>
          </div>
        </section>

        {/* Border Radius */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '700',
            marginBottom: '1.5rem',
            color: '#102B32'
          }}>
            Border Radius Options
          </h2>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <Button rounded="none">None</Button>
            <Button rounded="sm">Small</Button>
            <Button rounded="md">Medium</Button>
            <Button rounded="lg">Large</Button>
            <Button rounded="full">Full (Pill)</Button>
          </div>
        </section>

        {/* Arrow Positions */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '700',
            marginBottom: '1.5rem',
            color: '#102B32'
          }}>
            Arrow Position & Visibility
          </h2>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <Button arrowPosition="right">Arrow Right</Button>
            <Button arrowPosition="left">Arrow Left</Button>
            <Button showArrow={false}>No Arrow</Button>
            <Button variant="outline-primary" arrowPosition="left">Back</Button>
          </div>
        </section>

        {/* Mixed Combinations */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '700',
            marginBottom: '1.5rem',
            color: '#102B32'
          }}>
            Example Combinations
          </h2>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <Button 
              variant="primary" 
              size="lg" 
              rounded="full"
            >
              Get Started
            </Button>
            <Button 
              variant="accent" 
              size="md" 
              rounded="lg"
            >
              Continue
            </Button>
            <Button 
              variant="outline-secondary" 
              size="sm" 
              rounded="md"
              arrowPosition="left"
            >
              Go Back
            </Button>
            <Button 
              variant="secondary" 
              size="md" 
              showArrow={false}
            >
              Submit
            </Button>
          </div>
        </section>

        {/* States */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '700',
            marginBottom: '1.5rem',
            color: '#102B32'
          }}>
            Button States
          </h2>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center'
          }}>
            <Button variant="primary">Normal</Button>
            <Button variant="primary" disabled>Disabled</Button>
            <Button variant="accent">Normal</Button>
            <Button variant="accent" disabled>Disabled</Button>
            <Button variant="outline-primary">Normal</Button>
            <Button variant="outline-primary" disabled>Disabled</Button>
          </div>
        </section>

        {/* Real World Examples */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '700',
            marginBottom: '1.5rem',
            color: '#102B32'
          }}>
            Real-World Use Cases
          </h2>
          
          {/* CTA Section */}
          <div style={{ 
            background: 'linear-gradient(135deg, #079ed7 0%, #0689bc 100%)',
            padding: '3rem',
            borderRadius: '12px',
            marginBottom: '1.5rem',
            color: '#ffffff'
          }}>
            <h3 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>
              Ready to get started?
            </h3>
            <p style={{ fontSize: '1.125rem', marginBottom: '2rem', opacity: 0.9 }}>
              Join thousands of users already using our platform
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button variant="accent" size="lg">
                Start Free Trial
              </Button>
              <Button variant="outline-accent" size="lg" showArrow={false}>
                Learn More
              </Button>
            </div>
          </div>

          {/* Navigation Example */}
          <div style={{ 
            background: '#f8f9fa',
            padding: '2rem',
            borderRadius: '12px',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', color: '#102B32' }}>
              Navigation Example
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <Button variant="ghost" arrowPosition="left" showArrow={true}>
                Previous
              </Button>
              <Button variant="primary">
                Next Step
              </Button>
            </div>
          </div>

          {/* Form Actions */}
          <div style={{ 
            background: '#ffffff',
            padding: '2rem',
            border: '1px solid #e5e7eb',
            borderRadius: '12px'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', color: '#102B32' }}>
              Form Actions
            </h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              <Button variant="ghost" showArrow={false}>
                Cancel
              </Button>
              <Button variant="outline-primary" showArrow={false}>
                Save Draft
              </Button>
              <Button variant="primary">
                Submit
              </Button>
            </div>
          </div>
        </section>

        {/* Usage Example */}
        <section style={{ 
          padding: '2rem',
          background: '#f8f9fa',
          borderRadius: '12px',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '700',
            marginBottom: '1rem',
            color: '#102B32'
          }}>
            Usage Examples
          </h3>
          <pre style={{ 
            background: '#102B32',
            color: '#ffffff',
            padding: '1.5rem',
            borderRadius: '8px',
            overflow: 'auto',
            fontSize: '14px',
            lineHeight: '1.6',
            margin: 0
          }}>
{`import Button from './Button';

// Basic usage
<Button variant="primary">
  Click Me
</Button>

// Without arrow
<Button showArrow={false}>
  Submit
</Button>

// Arrow on left
<Button arrowPosition="left">
  Go Back
</Button>

// Different sizes and styles
<Button variant="accent" size="lg" rounded="full">
  Get Started
</Button>

<Button variant="outline-primary" size="sm">
  Learn More
</Button>

// With onClick handler
<Button 
  variant="secondary"
  onClick={() => console.log('Clicked!')}
>
  Continue
</Button>

// Disabled state
<Button disabled>
  Disabled Button
</Button>`}
          </pre>
        </section>

        {/* Props Reference */}
        <section style={{ marginTop: '3rem' }}>
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '700',
            marginBottom: '1rem',
            color: '#102B32'
          }}>
            Available Props
          </h3>
          <div style={{ 
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', fontWeight: '600', color: '#102B32' }}>Prop</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', fontWeight: '600', color: '#102B32' }}>Type</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', fontWeight: '600', color: '#102B32' }}>Default</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', fontFamily: 'monospace', fontSize: '13px' }}>variant</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', fontSize: '13px', color: '#6b7280' }}>string</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', fontFamily: 'monospace', fontSize: '13px' }}>'primary'</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', fontFamily: 'monospace', fontSize: '13px' }}>size</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', fontSize: '13px', color: '#6b7280' }}>sm | md | lg</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', fontFamily: 'monospace', fontSize: '13px' }}>'md'</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', fontFamily: 'monospace', fontSize: '13px' }}>rounded</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', fontSize: '13px', color: '#6b7280' }}>none | sm | md | lg | full</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', fontFamily: 'monospace', fontSize: '13px' }}>'full'</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', fontFamily: 'monospace', fontSize: '13px' }}>showArrow</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', fontSize: '13px', color: '#6b7280' }}>boolean</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', fontFamily: 'monospace', fontSize: '13px' }}>true</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', fontFamily: 'monospace', fontSize: '13px' }}>arrowPosition</td>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#6b7280' }}>left | right</td>
                  <td style={{ padding: '12px', fontFamily: 'monospace', fontSize: '13px' }}>'right'</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Color Reference */}
        <section style={{ marginTop: '3rem' }}>
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '700',
            marginBottom: '1.5rem',
            color: '#102B32'
          }}>
            Brand Colors
          </h3>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                background: '#079ed7',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }} />
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#102B32' }}>Primary</div>
                <div style={{ fontSize: '13px', color: '#6b7280', fontFamily: 'monospace' }}>#079ed7</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                background: '#102B32',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }} />
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#102B32' }}>Secondary</div>
                <div style={{ fontSize: '13px', color: '#6b7280', fontFamily: 'monospace' }}>#102B32</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                background: '#cfef00',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }} />
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#102B32' }}>Accent</div>
                <div style={{ fontSize: '13px', color: '#6b7280', fontFamily: 'monospace' }}>#cfef00</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
