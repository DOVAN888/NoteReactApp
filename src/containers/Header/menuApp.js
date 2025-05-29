export const adminMenu = [
    { //  Menu cấp 1 – nhóm “Hệ thống”
        name: 'menu.system.header', // key dùng cho đa ngôn ngữ, hiển thị "Hệ thống"
        menus: [ // ⬇các menu con (cấp 2)
            {
                name: 'menu.system.system-administrator.header', // key hiển thị "Quản trị hệ thống"
                subMenus: [ // ⬇ các mục chức năng cụ thể (cấp 3)
                    { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' }, // "Quản lý người dùng"
                    { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' }, // "Quản lý sản phẩm"
                ]
            },
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' }, // (bạn có thể bật lại nếu cần thêm menu)
        ]
    },
];
