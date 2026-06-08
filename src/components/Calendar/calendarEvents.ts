export const calendarEvents = [
        {
          title: 'Meeting with Team Dev',
          className: 'badge badge-pink-transparent',
          backgroundColor: '#FFEDF6',
          textColor: "#FD3995",
          start: new Date(Date.now() - 168000000).toJSON().slice(0, 10),
          end: new Date(Date.now() - 168000000).toJSON().slice(0, 10),
        },
        {
          title: 'UI/UX Team...',
          className: 'badge badge-secondary-transparent',
          backgroundColor: '#EDF2F4',
          textColor: "#0C4B5E",
          start: new Date(Date.now() + 338000000).toJSON().slice(0, 10)
        },
        {
          title: 'Data Update...',
          className: 'badge badge-purple-transparent',
          backgroundColor: '#F7EEF9',
          textColor: "#AB47BC",
          start: new Date(Date.now() - 338000000).toJSON().slice(0, 10)
        },
        {
          title: 'Meeting with Team Dev',
          className: 'badge badge-dark-transparent',
          backgroundColor: '#E8E9EA',
          textColor: "#212529",
          start: new Date(Date.now() + 68000000).toJSON().slice(0, 10)
        },
        {
          title: 'Design System',
          className: 'badge badge-danger-transparent',
          backgroundColor: '#FAE7E7',
          textColor: "#E70D0D",
          start: new Date(Date.now() + 88000000).toJSON().slice(0, 10)
        },
];
