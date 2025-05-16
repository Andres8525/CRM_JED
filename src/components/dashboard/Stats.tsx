import React from 'react';
import { UserRound, Calendar, Activity, Clock } from 'lucide-react';
import Card from '../common/Card';

interface StatItemProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

const StatItem: React.FC<StatItemProps> = ({ title, value, icon, change, changeType = 'neutral' }) => {
  const changeColors = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-500'
  };

  return (
    <Card className="flex-1">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
          {change && (
            <p className={`text-sm mt-2 ${changeColors[changeType]}`}>
              {change}
            </p>
          )}
        </div>
        <div className="p-3 bg-[#4A90E2]/10 rounded-md">
          <div className="text-[#4A90E2]">{icon}</div>
        </div>
      </div>
    </Card>
  );
};

const Stats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <StatItem
        title="Total de Pacientes"
        value="156"
        icon={<UserRound size={24} />}
        change="+12 desde el mes pasado"
        changeType="positive"
      />
      <StatItem
        title="Citas Hoy"
        value="24"
        icon={<Calendar size={24} />}
        change="8 pendientes"
        changeType="neutral"
      />
      <StatItem
        title="Doctores Disponibles"
        value="7"
        icon={<UserRound size={24} />}
        change="+2 desde ayer"
        changeType="positive"
      />
      <StatItem
        title="Tiempo de Espera Promedio"
        value="14 min"
        icon={<Clock size={24} />}
        change="-2 min desde la semana pasada"
        changeType="positive"
      />
    </div>
  );
};

export default Stats;