export default function DamageAndService() {
  const history = [
    {
      date: "2021-08-15",
      type: "Service",
      description: "Stora servicen genomförd på märkesverkstad",
      iconType: "service",
    },
    {
      date: "2022-01-10",
      type: "Skada",
      description: "Frontskada efter kollision – åtgärdad via försäkring",
      iconType: "damage",
    },
    {
      date: "2022-12-04",
      type: "Service",
      description: "Oljebyte + bromsbelägg bytta",
      iconType: "service",
    },
    {
      date: "2023-06-01",
      type: "Återkallelse",
      description: "Åtgärd av mjukvarufel relaterat till ABS-systemet",
      iconType: "recall",
    },
  ]; /** MOCK DATA */

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "service":
        return (
          <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      case "damage":
        return (
          <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.865-.833-2.631 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case "recall":
        return (
          <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };

  return (
    <section className="p-6 bg-white rounded-xl shadow-md border">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Fullständig Skade- & Servicehistorik</h2>

      <div className="space-y-4">
        {history.map((item, index) => (
          <div key={index} className="flex items-start">
            {getIcon(item.iconType)}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold text-gray-900">{item.type}</p>
                <p className="text-xs text-gray-500">{item.date}</p>
              </div>
              <p className="text-sm text-gray-600">
                {item.description}
                <span className="text-xs text-gray-400 ml-2">/** MOCK DATA */</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-xs text-gray-500">Historik källa</p>
            <p className="text-sm font-semibold text-gray-900">
              Komplett historik från märkesverkstad och försäkringsbolag
              <span className="text-xs text-gray-400 ml-2">/** MOCK DATA */</span>
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Data från Carfax, Bilvision och andra verifierade källor
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 