export const adminMenu = [
  {
    name: 'menu.admin.manage-user',
    menus: [
      { name: 'menu.admin.crud', link: '/system/user-manage' },
      { name: 'menu.admin.crud-redux', link: '/system/user-redux' },
      { name: 'menu.admin.manage-doctor', link: '/system/manage-doctor' }
    ]
  },
  {
    name: 'menu.doctor.manage-schedule', // 👈 Đặt ngoài cùng (nếu admin cũng có menu này)
    menus: [
      { name: 'menu.doctor.schedule', link: '/doctor/manage-schedule' }
    ]
  },
  {
    name: 'menu.admin.clinic',
    menus: [
      { name: 'menu.admin.manage-clinic', link: '/system/manage-clinic' }
    ]
  },
  {
    name: 'menu.admin.specialty',
    menus: [
      { name: 'menu.admin.manage-specialty', link: '/system/manage-specialty' }
    ]
  },
  {
    name: 'menu.admin.handbook',
    menus: [
      { name: 'menu.admin.manage-handbook', link: '/system/manage-handbook' }
    ]
  }
];


export const doctorMenu = [
    // quan ly ke hoach kham benh cua ba si 
    {
        name: 'menu.doctor.manage-schedule',
        menus: [
            {
                name: 'menu.doctor.schedule', link: '/doctor/manage-schedule'
            }
        ]
    }
]


