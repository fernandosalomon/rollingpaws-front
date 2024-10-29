import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonC from "./shared/ButtonC";
import { Slide, Slideshow } from "./shared/Slideshow";
import style from "../styles/Services.module.css";
import {
  CardBody,
  CardImage,
  CardText,
  CardTitle,
  CustomCard,
} from "./shared/CustomCard";
import { useState } from "react";

const ServicesPage = () => {
  const [showSlide, setShowSlide] = useState(0);

  return (
    <>
      <h2 className={style.pageTitle}>Servicios</h2>
      <h3 className={style.pageSubtitle}>
        En Clínica Veterinaria Rolling Paws brindamos una completa variedad de
        servicios médicos y quirúrgicos, incluyendo atención preventiva,
        diagnósticos avanzados, cuidados intensivos y cirugía, para ofrecer un
        tratamiento integral a cada mascota
      </h3>
      <Container>
        <div className="row justify-content-center">
          <ButtonC
            variant="button1"
            className={`${style.displayButton} col-12 col-md-4 col-lg-3 d-flex align-items-center justify-content-center`}
            onClick={() => setShowSlide(0)}
          >
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 6H5.2C4.0799 6 3.51984 6 3.09202 6.21799C2.71569 6.40973 2.40973 6.71569 2.21799 7.09202C2 7.51984 2 8.0799 2 9.2V17.8C2 18.9201 2 19.4802 2.21799 19.908C2.40973 20.2843 2.71569 20.5903 3.09202 20.782C3.51984 21 4.0799 21 5.2 21H18.8C19.9201 21 20.4802 21 20.908 20.782C21.2843 20.5903 21.5903 20.2843 21.782 19.908C22 19.4802 22 18.9201 22 17.8V9.2C22 8.07989 22 7.51984 21.782 7.09202C21.5903 6.71569 21.2843 6.40973 20.908 6.21799C20.4802 6 19.9201 6 18.8 6H17M2 10H4M20 10H22M2 14H4M20 14H22M12 6V10M10 8H14M17 21V6.2C17 5.0799 17 4.51984 16.782 4.09202C16.5903 3.71569 16.2843 3.40973 15.908 3.21799C15.4802 3 14.9201 3 13.8 3H10.2C9.07989 3 8.51984 3 8.09202 3.21799C7.71569 3.40973 7.40973 3.71569 7.21799 4.09202C7 4.51984 7 5.0799 7 6.2V21H17ZM14 21V17C14 15.8954 13.1046 15 12 15C10.8954 15 10 15.8954 10 17V21H14Z"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="ms-2 mb-0">Clínica</p>
          </ButtonC>
          <ButtonC
            variant="button1"
            className={`${style.displayButton} col-12 col-md-4 col-lg-3 d-flex align-items-center justify-content-center`}
            onClick={() => setShowSlide(1)}
          >
            <svg
              fill="#000000"
              width="30px"
              height="30px"
              viewBox="0 0 50 50"
              version="1.2"
              baseProfile="tiny"
              xmlns="http://www.w3.org/2000/svg"
              overflow="inherit"
            >
              <path d="M18.48 18.875c2.33-.396 4.058-2.518 4.321-5.053.267-2.578.869-12.938-3.02-12.279-10.088 1.711-9.38 18.702-1.301 17.332zm13.273 0c8.077 1.37 8.785-15.621-1.303-17.333-3.888-.659-3.287 9.701-3.021 12.279.264 2.536 1.994 4.658 4.324 5.054zm-17.417 8.005c0-1.348-.481-2.57-1.256-3.459-1.275-1.666-5.328-5.035-6.323-4.172-2.077 1.806-2.01 6.251-.759 9.481.643 1.796 2.196 3.059 4.011 3.059 2.389 0 4.327-2.198 4.327-4.909zm29.137-7.631c-.993-.863-5.046 2.506-6.321 4.172-.775.889-1.257 2.111-1.257 3.459 0 2.711 1.94 4.909 4.327 4.909 1.816 0 3.37-1.263 4.013-3.059 1.248-3.23 1.317-7.675-.762-9.481zm-8.136 15.277c-3.676-1.833-3.562-5.363-4.398-8.584-.665-2.569-3.02-4.469-5.823-4.469-2.743 0-5.057 1.821-5.779 4.312-.895 3.082-.356 6.67-4.363 8.717-3.255 1.061-4.573 2.609-4.573 6.27 0 2.974 2.553 6.158 5.848 6.554 3.676.554 6.544-.17 8.867-1.494 2.323 1.324 5.189 2.047 8.871 1.494 3.293-.396 5.847-3.568 5.847-6.554-.001-3.741-1.235-5.135-4.497-6.246zm-4.337 4.474h-3.811l.005 4h-4.156l.006-4h-4.044v-4h4.045l-.006-4h4.156l-.005 4h3.81v4z" />
            </svg>
            <p className="ms-2 mb-0">Guardia e Internación</p>
          </ButtonC>
          <ButtonC
            variant="button1"
            className={`${style.displayButton} col-12 col-md-4 col-lg-3 d-flex align-items-center justify-content-center`}
            onClick={() => setShowSlide(2)}
          >
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M27.1847 36.6486C26.5566 36.2383 25.8062 35.9998 25 35.9998C22.7909 35.9998 21 37.7907 21 39.9998C21 42.209 22.7909 43.9998 25 43.9998C27.2012 43.9998 28.9871 42.2218 28.9999 40.0236L29.2239 35.9998H30.7761L31.0001 40.0236C31.0129 42.2218 32.7988 43.9998 35 43.9998C37.2091 43.9998 39 42.209 39 39.9998C39 37.7907 37.2091 35.9998 35 35.9998C34.1938 35.9998 33.4434 36.2383 32.8153 36.6486L30.9985 4.01025L30 4.06583L29.0015 4.01025L27.1847 36.6486ZM30.6648 33.9998L30 22.058L29.3352 33.9998H30.6648ZM31 18C31 18.5523 30.5523 19 30 19C29.4477 19 29 18.5523 29 18C29 17.4477 29.4477 17 30 17C30.5523 17 31 17.4477 31 18ZM23 39.9998C23 38.8953 23.8954 37.9998 25 37.9998C26.1046 37.9998 27 38.8953 27 39.9998C27 41.1044 26.1046 41.9998 25 41.9998C23.8954 41.9998 23 41.1044 23 39.9998ZM35 37.9998C33.8954 37.9998 33 38.8953 33 39.9998C33 41.1044 33.8954 41.9998 35 41.9998C36.1046 41.9998 37 41.1044 37 39.9998C37 38.8953 36.1046 37.9998 35 37.9998Z"
                fill="#333333"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17 4.23389V16.0001C17 17.6569 15.6569 19.0001 14 19.0001C12.3595 19.0001 10.9544 17.6523 11.0638 15.9334C11.3253 11.8234 12.3507 9.16292 13.3671 7.50053C13.874 6.67145 14.3733 6.09945 14.7625 5.72519C14.9568 5.53833 15.1229 5.40144 15.2479 5.30684C15.3103 5.25956 15.3624 5.22288 15.4026 5.19582C15.4226 5.18229 15.4397 5.17118 15.4536 5.16234L15.472 5.15079L15.4794 5.14628L15.4826 5.14433L15.4841 5.14343C15.4848 5.143 15.4855 5.14258 16 6.00008L15.4855 5.14258L17 4.23389ZM15 8.66598C14.1919 10.0348 13.296 12.3464 13.0597 16.0604C13.0288 16.5462 13.4314 17.0001 14 17.0001C14.5523 17.0001 15 16.5524 15 16.0001V8.66598Z"
                fill="#333333"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15 41.5V20.5C15 20.2239 14.7761 20 14.5 20C14.2239 20 14 20.2239 14 20.5V41.5C14 41.7761 14.2239 42 14.5 42C14.7761 42 15 41.7761 15 41.5ZM14.5 18C13.1193 18 12 19.1193 12 20.5V41.5C12 42.8807 13.1193 44 14.5 44C15.8807 44 17 42.8807 17 41.5V20.5C17 19.1193 15.8807 18 14.5 18Z"
                fill="#333333"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.2929 23.293L15.2929 20.293L16.7071 21.7072L13.7071 24.7072L12.2929 23.293Z"
                fill="#333333"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.2929 27.293L15.2929 24.293L16.7071 25.7072L13.7071 28.7072L12.2929 27.293Z"
                fill="#333333"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.2929 31.293L15.2929 28.293L16.7071 29.7072L13.7071 32.7072L12.2929 31.293Z"
                fill="#333333"
              />
            </svg>
            <p className="ms-2 mb-0"> Cirugía</p>
          </ButtonC>
          <ButtonC
            variant="button1"
            className={`${style.displayButton} col-12 col-md-4 col-lg-3 d-flex align-items-center justify-content-center`}
            onClick={() => setShowSlide(3)}
          >
            <svg
              fill="#000000"
              height="30px"
              width="30px"
              version="1.1"
              id="Layer_1"
              viewBox="0 0 410 410"
            >
              <g>
                <g>
                  <path
                    d="M374.726,325.864h-1.333c10.674-87.423-17.745-140.513-38.406-166.563c-1.532-8.068-4.771-15.466-9.309-21.838
			l12.976-12.976c10.049-10.048,12.84-24.645,8.378-37.224l25.093-25.093c5.974-5.973,5.974-15.659,0-21.634L336.067,4.48
			C333.198,1.611,329.307,0,325.25,0s-7.948,1.612-10.816,4.48L289.36,29.554c-3.803-1.355-7.849-2.06-12.001-2.06
			c-0.001,0,0,0-0.001,0c-9.534,0-18.498,3.712-25.241,10.454L135.29,154.776c-10.048,10.048-12.838,24.645-8.376,37.222
			l-10.669,10.669c-6.743,6.743-10.455,15.707-10.455,25.242c0,9.532,3.712,18.499,10.455,25.239l7.21,7.211
			c6.743,6.741,15.707,10.453,25.241,10.453c9.534,0,18.498-3.712,25.242-10.453l10.649-10.649c3.801,1.354,7.847,2.06,12.001,2.06
			c9.535,0,18.499-3.715,25.239-10.456l26.146-26.146c1.854,1.327,3.792,2.55,5.814,3.648c6.409,25.349,2.062,50.87-12.963,75.967
			c-8.993,15.024-19.588,25.924-25.099,31.083H87.136l-14.451-14.191h124.149c8.448,0,15.298-6.85,15.298-15.298
			c0-8.447-6.85-15.298-15.298-15.298H35.274c-6.213,0-11.808,3.757-14.161,9.508c-2.35,5.751-0.99,12.354,3.441,16.705
			l42.698,41.93v45.483c0,8.449,6.85,15.298,15.298,15.298h292.175c8.449,0,15.3-6.85,15.3-15.298v-53.54
			C390.025,332.714,383.174,325.864,374.726,325.864z M141.653,379.403l-23.363-22.944h122.126
			c2.358,8.569,6.579,16.374,12.21,22.944H141.653L141.653,379.403z M152.301,238.725c-1.3,1.3-2.817,1.496-3.605,1.496
			c-0.788,0-2.306-0.196-3.605-1.496l-7.212-7.209c-1.299-1.301-1.494-2.816-1.494-3.604c0-0.79,0.195-2.306,1.495-3.606
			l8.229-8.229l14.421,14.421L152.301,238.725z M224.608,169.835c0,7.417,1.493,14.597,4.228,21.203l-28.642,28.642
			c-1.299,1.299-2.816,1.493-3.605,1.493c-0.788,0-2.307-0.191-3.607-1.493l-36.056-36.057c-1.987-1.989-1.988-5.223,0-7.212
			L273.751,59.584c1.299-1.3,2.815-1.495,3.605-1.495c0.786,0,2.306,0.195,3.605,1.496l9.153,9.154
			c1.158,1.211,2.323,2.359,3.438,3.455c0.56,0.549,1.129,1.112,1.702,1.685l7.38,7.38c0.603,0.603,1.19,1.202,1.771,1.789
			c1.104,1.122,2.262,2.295,3.479,3.461l9.132,9.132c1.988,1.987,1.988,5.224,0,7.211l-15.468,15.47
			c-6.56-2.693-13.739-4.173-21.258-4.173C249.587,114.148,224.608,139.129,224.608,169.835z M297.887,369.69
			c-16.001,0-29.019-13.021-29.019-29.021s13.018-29.019,29.019-29.019c16.002,0,29.021,13.018,29.021,29.019
			C326.909,356.671,313.889,369.69,297.887,369.69z M359.428,379.403h-16.279c5.635-6.573,9.862-14.38,12.221-22.96l4.06,0.006
			L359.428,379.403L359.428,379.403z"
                  />
                </g>
              </g>
            </svg>
            <p className="ms-1 mb-0">Laboratorio y Diagnóstico por Imagenes</p>
          </ButtonC>
          <ButtonC
            variant="button1"
            className={`${style.displayButton} col-12 col-md-4 col-lg-3 d-flex align-items-center justify-content-center`}
            onClick={() => setShowSlide(4)}
          >
            <svg
              fill="#000000"
              width="40px"
              height="40px"
              viewBox="-2.5 0 19 19"
              xmlns="http://www.w3.org/2000/svg"
              class="cf-icon-svg"
            >
              <path d="M11.56 10.11v2.046a3.827 3.827 0 1 1-7.655 0v-.45A3.61 3.61 0 0 1 .851 8.141V5.25a1.682 1.682 0 0 1 .763-1.408 1.207 1.207 0 1 1 .48 1.04.571.571 0 0 0-.135.368v2.89a2.5 2.5 0 0 0 5 0V5.25a.57.57 0 0 0-.108-.334 1.208 1.208 0 1 1 .533-1.018 1.681 1.681 0 0 1 .683 1.352v2.89a3.61 3.61 0 0 1-3.054 3.565v.45a2.719 2.719 0 0 0 5.438 0V10.11a2.144 2.144 0 1 1 1.108 0zm.48-2.07a1.035 1.035 0 1 0-1.035 1.035 1.037 1.037 0 0 0 1.036-1.035z" />
            </svg>
            <p className="ms-2 mb-0">Especialidades</p>
          </ButtonC>
          <ButtonC
            variant="button1"
            className={`${style.displayButton} col-12 col-md-4 col-lg-3 d-flex align-items-center justify-content-center`}
            onClick={() => setShowSlide(5)}
          >
            <svg
              fill="#000000"
              height="40px"
              width="40px"
              version="1.1"
              id="Layer_1"
              viewBox="0 0 157 256"
            >
              <path
                d="M129.7,31.6H92.7c-6.6-0.1-6.4,9.8,0,9.8h36.9v4.9H92.9c-6.7,0-6.5,9.8,0,9.8h36.8v4.9v0.2H92.9c-6.7,0-6.5,9.9,0,9.9h36.8
	v4.9H92.9c-6.6,0-6.5,9.8,0,9.8h36.8v4.9H92.9c-6.6,0-6.6,9.9,0,9.8h36.8v5H92.9c-6.6-0.1-6.6,9.8,0,9.8h36.8v4.9H92.9
	c-6.6,0-6.6,9.8,0,9.8h36.8v4.9H92.9c-6.6,0-6.5,9.9,0,9.9h36.8v95.5c-0.1,14.6,22.2,14.4,22.2,0V16.9c0-6.6-5.5-15-14.6-15
	L92.7,1.8c-6.6,0.1-6.4,9.9,0,9.9h36.9v4.9H92.7c-6.6,0-6.4,9.9,0,9.8h36.9V31.6L129.7,31.6z"
              />
              <path d="M87,224.6c-1.3,8.1,1.5,22.6,7.2,27.9c6,5.5,13.1-1.5,10.2-7.2c-3-5.6-6.7-8.7-3.6-22.1L87,224.6L87,224.6z" />
              <path d="M30.1,201" />
              <path
                d="M75.2,177.5v-65.1L62.9,5.3c-0.4-2.9-2.1-3.6-3.8-3.6c-1.6,0-3.4,0.6-3.7,3.6l-12,107.1v65.1c-22.7-11.8-39.7,6.6-39.8,23.3
	c0.1,14.9,11.1,27.2,26.8,27.2c15.7-0.1,26.4-13.8,26.4-27.2v-65.4h5v65.4c0,15.5,12.6,27,26,27c16.9,0,27.6-11.9,27.6-26.9
	C115.5,184,97.9,165.7,75.2,177.5z M30.1,214.4c-7.4,0-13.3-6-13.4-13.4c0.1-7.3,6-13.3,13.4-13.3c7.4,0,13.4,5.9,13.4,13.3
	C43.5,208.4,37.5,214.4,30.1,214.4z M88.9,214.4c-7.3,0-13.3-6-13.3-13.4c0-7.3,5.9-13.3,13.3-13.3c7.4,0,13.4,5.9,13.4,13.3
	C102.3,208.4,96.4,214.4,88.9,214.4z"
              />
              <path d="M88.9,201" />
            </svg>
            <p className="ms-2 mb-0">Peluquería</p>
          </ButtonC>
          <ButtonC
            variant="button1"
            className={`${style.displayButton} col-12 col-md-4 col-lg-3 d-flex align-items-center justify-content-center`}
            onClick={() => setShowSlide(6)}
          >
            <svg
              fill="#000000"
              width="40px"
              height="40px"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M855.808 428.503c71.424-71.424 71.424-187.214.021-258.618l-3.686-3.676c-71.424-71.424-187.214-71.424-258.638 0L166.201 593.513c-71.416 71.425-71.413 187.226.009 258.649l3.656 3.656c71.424 71.424 187.224 71.424 258.647 0l427.295-427.315zm28.963 28.963L457.476 884.781c-87.419 87.419-229.155 87.419-316.574 0l-3.656-3.656c-87.417-87.417-87.421-229.152-.01-316.574l427.305-427.305c87.419-87.419 229.144-87.419 316.543-.02l3.686 3.676c87.419 87.419 87.419 229.144 0 316.564z" />
              <path d="M350.519 380.235l291.267 291.267c7.998 7.998 20.965 7.998 28.963 0s7.998-20.965 0-28.963L379.482 351.272c-7.998-7.998-20.965-7.998-28.963 0s-7.998 20.965 0 28.963zM181.871 539.999v361.298c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48V539.999c0-11.311-9.169-20.48-20.48-20.48s-20.48 9.169-20.48 20.48zm107.52-119.113V928.77c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48V420.886c0-11.311-9.169-20.48-20.48-20.48s-20.48 9.169-20.48 20.48z" />
              <path d="M397.935 425.311V880.1c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48V425.311c0-11.311-9.169-20.48-20.48-20.48s-20.48 9.169-20.48 20.48zm106.496 114.688V769.17c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48V539.999c0-11.311-9.169-20.48-20.48-20.48s-20.48 9.169-20.48 20.48z" />
            </svg>
            <p className="ms-2 mb-0">Farmacia y Petshop</p>
          </ButtonC>
        </div>
      </Container>
      <Container className={style.sliderContainer}>
        <Slideshow goToSlide={showSlide} className={style.slider}>
          <Slide>
            <CustomCard
              variant="horizontal"
              width={"100%"}
              height={"53rem"}
              className={style.cardContainer}
            >
              <CardImage
                src={"src/assets/img/services/clinica.jpg"}
                className={style.cardImage}
              />
              <CardBody className={style.cardBody}>
                <CardTitle className={style.title}>Clínica</CardTitle>
                <CardText className={style.text}>
                  Ofrecemos servicios de clínica general y especializada para
                  cuidar la salud de tu mascota en todo momento, desde consultas
                  de rutina hasta diagnósticos y tratamientos avanzados.
                </CardText>
                <ButtonC variant="button1" className={style.button}>
                  Saber más
                </ButtonC>
              </CardBody>
            </CustomCard>
          </Slide>
          <Slide>
            <CustomCard
              variant="horizontal"
              width={"100%"}
              height={"53rem"}
              className={style.cardContainer}
            >
              <CardImage
                src={"src/assets/img/services/clinica.jpg"}
                className={style.cardImage}
              />
              <CardBody className={style.cardBody}>
                <CardTitle className={style.title}>
                  Guardia e Internación
                </CardTitle>
                <CardText className={style.text}>
                  Servicio veterinario constante. Atención de emergencias las 24
                  horas, incluyendo fines de semana. Diagnóstico rápido con
                  radiografías, ecografías y laboratorio propio.
                </CardText>
                <ButtonC variant="button1" className={style.button}>
                  Saber más
                </ButtonC>
              </CardBody>
            </CustomCard>
          </Slide>
          <Slide>
            <CustomCard
              variant="horizontal"
              width={"100%"}
              height={"53rem"}
              className={style.cardContainer}
            >
              <CardImage
                src={"src/assets/img/services/dog-surgery.jpg"}
                className={style.cardImage}
              />
              <CardBody className={style.cardBody}>
                <CardTitle className={style.title}>Cirugía</CardTitle>
                <CardText className={style.text}>
                  Nuestro servicio de cirugía veterinaria garantiza
                  procedimientos seguros y precisos, con un equipo altamente
                  capacitado y tecnología moderna. Nos enfocamos en una
                  recuperación rápida y en el bienestar integral de tu mascota.
                </CardText>
                <ButtonC variant="button1" className={style.button}>
                  Saber más
                </ButtonC>
              </CardBody>
            </CustomCard>
          </Slide>
          <Slide>
            <CustomCard
              variant="horizontal"
              width={"100%"}
              height={"53rem"}
              className={style.cardContainer}
            >
              <CardImage
                src={"src/assets/img/services/clinica.jpg"}
                className={style.cardImage}
              />
              <CardBody className={style.cardBody}>
                <CardTitle className={style.title}>
                  Laboratorio y Diagnóstico por Imagenes
                </CardTitle>
                <CardText className={style.text}>
                  Contamos con radiografías, ecografías y un laboratorio propio
                  para realizar análisis, lo que nos permite obtener resultados
                  de diagnóstico de manera ágil y precisa, brindando a tu
                  mascota la atención oportuna que necesita.
                </CardText>
                <ButtonC variant="button1" className={style.button}>
                  Saber más
                </ButtonC>
              </CardBody>
            </CustomCard>
          </Slide>
          <Slide>
            <CustomCard
              variant="horizontal"
              width={"100%"}
              height={"53rem"}
              className={style.cardContainer}
            >
              <CardImage
                src={"src/assets/img/services/clinica.jpg"}
                className={style.cardImage}
              />
              <CardBody className={style.cardBody}>
                <CardTitle className={style.title}>Especialidades</CardTitle>
                <CardText className={style.text}>
                  Explora nuestra amplia variedad de más de 10 especialidades
                  dedicadas al cuidado completo de tu mascota, incluyendo
                  medicina interna, cirugía, dermatología y oftalmología,
                  respaldadas por un equipo de profesionales comprometidos.
                </CardText>
                <ButtonC variant="button1" className={style.button}>
                  Saber más
                </ButtonC>
              </CardBody>
            </CustomCard>
          </Slide>
          <Slide>
            <CustomCard
              variant="horizontal"
              width={"100%"}
              height={"53rem"}
              className={style.cardContainer}
            >
              <CardImage
                src={"src/assets/img/services/dog-haircut.jpg"}
                className={style.cardImage}
              />
              <CardBody className={style.cardBody}>
                <CardTitle className={style.title}>Peluquería</CardTitle>
                <CardText className={style.text}>
                  Ofrecemos un cuidado integral que incluye baño, corte de pelo,
                  limpieza de oídos y corte de uñas, todo adaptado a las
                  necesidades de tu mascota. Nos enfocamos en su higiene,
                  confort y apariencia, brindándole una experiencia completa.
                </CardText>
                <ButtonC variant="button1" className={style.button}>
                  Saber más
                </ButtonC>
              </CardBody>
            </CustomCard>
          </Slide>
          <Slide>
            <CustomCard
              variant="horizontal"
              width={"100%"}
              height={"53rem"}
              className={style.cardContainer}
            >
              <CardImage
                src={"src/assets/img/services/store.jpg"}
                className={style.cardImage}
              />
              <CardBody className={style.cardBody}>
                <CardTitle className={style.title}>
                  Farmacia y Petshop
                </CardTitle>
                <CardText className={style.text}>
                  Nuestra tienda ofrece una selección de productos de alta
                  calidad para el cuidado y bienestar de tu mascota, desde
                  alimentos especializados hasta accesorios y juguetes. Todo lo
                  que necesitas para mantener a tu compañero sano y feliz, en un
                  solo lugar.
                </CardText>
                <ButtonC variant="button1" className={style.button}>
                  Saber más
                </ButtonC>
              </CardBody>
            </CustomCard>
          </Slide>
        </Slideshow>
      </Container>
    </>
  );
};

export default ServicesPage;
