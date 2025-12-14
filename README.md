# Lista de Tareas - Sistema Colaborativo de Gestión de Tareas

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-4.4.0-646CFF?style=for-the-badge&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![JSON Server](https://img.shields.io/badge/JSON_Server-0.17.0-000000?style=for-the-badge&logo=json)

**Aplicación web moderna para gestión colaborativa de tareas en equipo**

[![SENA](https://img.shields.io/badge/SENA-Proyecto_Final-FF6B00?style=for-the-badge)](https://www.sena.edu.co)

</div>

##  Tabla de Contenidos

- [ Descripción del Proyecto](#-descripción-del-proyecto)
- [ Características](#-características)
- [ Tecnologías Utilizadas](#️-tecnologías-utilizadas)
- [ Instalación y Configuración](#-instalación-y-configuración)
- [ Uso de la Aplicación](#-uso-de-la-aplicación)
- [ Arquitectura del Proyecto](#️-arquitectura-del-proyecto)
- [ Estructura de Carpetas](#-estructura-de-carpetas)
- [ Autores](#-autores)
- [ Contacto](#-contacto)

##  Descripción del Proyecto

**Team To-Do** es una aplicación web desarrollada como proyecto final para el SENA, que permite a equipos de trabajo colaborar en la gestión y organización de tareas de manera eficiente y en tiempo real.

### Contexto Académico
- **Institución:** Servicio Nacional de Aprendizaje (SENA)
- **Programa:** Tecnólogo en Análisis y Desarrollo de Software
- **Módulos Aplicados:** 1 al 4 (React, Estado, Componentes, APIs)
- **Instructor:** Jeysson Contreras

##  Características

###  Autenticación y Seguridad
- ✅ Sistema de login para dos usuarios
- ✅ Rutas protegidas y navegación segura
- ✅ Persistencia de sesión
- ✅ Logout con confirmación

###  Gestión de Tareas
- ✅ **CRUD Completo:** Crear, Leer, Actualizar, Eliminar tareas
- ✅ **Tareas colaborativas:** Multi-usuario
- ✅ **Estados:** Completado/Pendiente
- ✅ **Edición en tiempo real**
- ✅ **Eliminación con confirmación**
- ✅ **Búsqueda inteligente** por autor o contenido

###  Experiencia de Usuario
- ✅ **Diseño responsive** (Mobile First)
- ✅ **Interfaz moderna** con colores pastel
- ✅ **Notificaciones Toast** para feedback
- ✅ **Estados de carga** y manejo de errores
- ✅ **Animaciones suaves** y transiciones

### 📊 Funcionalidades Avanzadas
- ✅ **Búsqueda en tiempo real** con debounce
- ✅ **Estadísticas del equipo** en tiempo real
- ✅ **Persistencia local** con localStorage
- ✅ **Backend simulado** con JSON Server
- ✅ **Filtrado dinámico** de contenido

## 🛠️ Tecnologías Utilizadas

### Frontend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 18.2.0 | Biblioteca principal UI |
| **Vite** | 4.4.0 | Build tool y dev server |
| **Tailwind CSS** | 3.3.0 | Framework de estilos |
| **React Router DOM** | 6.8.0 | Navegación entre vistas |
| **Axios** | 1.6.0 | Cliente HTTP para APIs |
| **React Toastify** | 9.1.0 | Sistema de notificaciones |

### Backend (Simulado)
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **JSON Server** | 0.17.0 | API REST simulada |
| **Node.js** | 18+ | Runtime environment |

### Herramientas de Desarrollo
| Herramienta | Propósito |
|-------------|-----------|
| **ESLint** | Análisis estático de código |
| **Prettier** | Formateo de código |
| **Git** | Control de versiones |

## 🚀 Instalación y Configuración

### Prerrequisitos
- **Node.js** versión 18 o superior
- **npm** o **yarn** como gestor de paquetes
- **Git** para clonar el repositorio

### 📥 Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Shirlyostos/PROYECTO_FINAL.git 
   cd reactproyectofinal-1