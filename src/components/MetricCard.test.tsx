import { render, screen } from '@testing-library/react';
import MetricCard from './MetricCard';

describe('MetricCard', () => {
  it('renders title and value', () => {
    render(<MetricCard title="Test Title" value={1234} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('1,234')).toBeInTheDocument();
  });

  it('renders string value', () => {
    render(<MetricCard title="String Value" value="ABC" />);
    expect(screen.getByText('ABC')).toBeInTheDocument();
  });

  it('renders change and changePercent with correct formatting', () => {
    render(
      <MetricCard title="Change Test" value={1000} change={50.5} changePercent={5.25} />
    );
    expect(screen.getByText('+50.50')).toBeInTheDocument();
    expect(screen.getByText('(+5.25%)')).toBeInTheDocument();
  });

  it('renders negative change and changePercent with correct formatting', () => {
    render(
      <MetricCard title="Negative Change" value={1000} change={-25.5} changePercent={-2.5} />
    );
    expect(screen.getByText('-25.50')).toBeInTheDocument();
    expect(screen.getByText('(-2.50%)')).toBeInTheDocument();
  });

  it('renders subtitle', () => {
    render(<MetricCard title="With Subtitle" value={100} subtitle="Test subtitle" />);
    expect(screen.getByText('Test subtitle')).toBeInTheDocument();
  });

  it('renders icon if provided', () => {
    render(
      <MetricCard title="With Icon" value={100} icon={<span data-testid="icon">icon</span>} />
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
