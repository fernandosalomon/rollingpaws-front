# RollingPaws

RollingPaws es un sistema diseñado para gestionar la administración de pacientes y la reserva de turnos en una veterinaria. Además, ofrece una sección informativa con datos sobre la veterinaria, los servicios, y los productos disponibles.

Este proyecto fue creado como parte del trabajo final presentado en el curso de desarrollo web fullstack de RollingCode School (https://web.rollingcodeschool.com/).

Desarrollador: Fernando F. Salomón (https://github.com/fernandosalomon).

## Tabla de Contenidos

1. [Características](#características)
2. [Requerimientos Técnicos](#requerimientos-técnicos)
3. [Instrucciones de Instalación](#instrucciones-de-instalación)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Contribuir](#contribuir)
6. [Licencia](#licencia)

---

## Características

- Página principal con información destacada, servicios, productos, planes de salud que se ofrecen y comentarios de clientes.
- Gestión de pacientes y turnos para usuarios registrados
- Sección de contacto con respuesta automática mediante el servicio nodemailer (https://www.nodemailer.com/).
- Integración con una API de clima para mostrar datos en tiempo real.
- Funcionalidad de login seguro con contraseñas encriptadas utilizando el servicio bcrypt (https://www.npmjs.com/package/bcrypt).
- Página 404 personalizada.
- Diseño responsive.
- Desarrollo del proyecto usando React y React-Bootstrap.

## Instrucciones de Instalación en Máquina Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/fernandosalomon/rollingpaws-front
cd rollingvet
```

### 3. Configuración
1. Navegar a la carpeta `rollingpaws-front`:
    ```bash
    cd ../rollingpaws-front
    ```
2. Instalar las dependencias:
    ```bash
    npm install
    ```
3. Iniciar la aplicación:
    ```bash
    npm start
    ```

### 4. Publicación del proyecto
- **Frontend:** https://rollingpaws-front.vercel.app/
- **Backend:** https://rollingpaws-back.vercel.app/

## Estructura del Proyecto

```
rollingpaws-front/
│   ├── src/
│   │   ├── components/
│   │   │   └── shared/
│   │   ├── helpers/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── styles/
│   │   ├── App.js
│   │   ├── index.css/
│   │   └── main.js
│   └── package.json
└── README.md
```

## Contribuir

1. Haz un fork de este repositorio.
2. Crea una nueva rama:
    ```bash
    git checkout -b feature/nueva-funcionalidad
    ```
3. Realiza tus cambios y realiza un commit:
    ```bash
    git commit -m "Agrega nueva funcionalidad"
    ```
4. Envía los cambios a tu repositorio remoto:
    ```bash
    git push origin feature/nueva-funcionalidad
    ```
5. Crea un Pull Request en el repositorio original.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.

---

¿Te gustaría agregar más detalles o modificar alguna sección?

