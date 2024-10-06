import style from "../styles/Services.module.css";
import { Slide, Slideshow } from "./shared/Slideshow";
import Image from "react-bootstrap/Image";
import { useEffect, useState } from "react";
import getServices from "../helpers/getServices";
import splitArray from "../helpers/splitArray";
import CardC from "./shared/CardC";

const Services = () => {
  const [services, setServices] = useState([]);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const getListOfServices = () => {
      const listOfServices = getServices();
      setServices(listOfServices);
    };
    getListOfServices();
  }, []);

  useEffect(() => {
    const getPages = () => {
      const pages = splitArray(services, 5);
      setPages(pages);
    };

    getPages();
  }, [services]);

  return (
    <>
      <div className={style.BannerContainer}>
        <Slideshow>
          <Slide>
            <div style={{ width: "100%", height: "100%" }}>
              <Image
                src="./src/assets/img/services/banner-atencion.png"
                alt="Banner Atención Personalizada"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </Slide>
          <Slide>
            <div style={{ width: "100%", height: "100%" }}>
              <Image
                src="./src/assets/img/services/banner-farmacia.png"
                alt="Banner Farmacia"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </Slide>
          <Slide>
            <div style={{ width: "100%", height: "100%" }}>
              <Image
                src="./src/assets/img/services/banner-tienda.png"
                alt="Banner Tienda"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </Slide>
          <Slide>
            <div style={{ width: "100%", height: "100%" }}>
              <Image
                src="./src/assets/img/services/banner-guarderia.png"
                alt="Banner Guardería"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </Slide>
        </Slideshow>
      </div>
      <div className="w-75 mx-auto">
        <h2 className={style.title}>Especialidades</h2>
        <Slideshow pagination>
          {pages.map((page, index) => (
            <Slide key={index}>
              {page.map((service) => (
                <CardC
                  variant="services"
                  image={service.src}
                  title={service.title}
                  style={{
                    maxWidth: "170px",
                    maxHeigth: "230px",
                    marginRight: "10px",
                    marginBottom: "15px",
                    border: 0,
                    textAlign: "center",
                  }}
                  key={service.title}
                />
              ))}
            </Slide>
          ))}
        </Slideshow>
      </div>
    </>
  );
};

export default Services;
