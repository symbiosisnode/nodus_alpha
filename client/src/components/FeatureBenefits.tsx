import React from 'react';
import { featureBenefits } from '../data/feature-benefits';

export default function FeatureBenefits() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Feature
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              MTO Benefit
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              GP Benefit
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              SA Benefit
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {featureBenefits.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.feature}
              </td>
              <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                {item.mtoBenefit}
              </td>
              <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                {item.gpBenefit}
              </td>
              <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                {item.saBenefit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 