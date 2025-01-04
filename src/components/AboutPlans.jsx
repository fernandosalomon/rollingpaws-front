import { Accordion } from "react-bootstrap";
import style from "../styles/AboutPlans.module.css"
import Container from "react-bootstrap/Container";
import FormC from "./shared/FormC";
import { useEffect } from "react";

const AboutPlans = () => {

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    }, [])

    return (
        <>
            <Container fluid className="py-3">
                <h2 className={style.title}>Planes de seguro personalizados para tus mascotas</h2>
                <h3 className={style.subtitle}>Actualmente contamos con los siguientes planes de seguro para tus mascotas. Para que uno de nuestros profecionales se ponga en contacto contigo rellena el formulario más abajo.</h3>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header className={style.accordionHeader}>
                            <div className="d-flex align-items-center justify-content-between w-100">
                                <h3 className={style.accordionHeaderTitle}>Primeros pasos</h3>
                                <p className={style.accordionHeaderPrice}>Desde $30000/mes</p>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body className={style.accordionBody}>
                            <p>
                                "Primeros Pasos" es un plan veterinario diseñado para mascotas de 0 a 5 años, enfocado en garantizar un crecimiento saludable y una vida plena desde los primeros días. Incluye chequeos veterinarios regulares para monitorear su desarrollo y detectar tempranamente posibles problemas de salud. El plan cubre vacunación completa para proteger a tu mascota de enfermedades comunes, además de desparasitaciones periódicas para mantenerla libre de parásitos.
                            </p>
                            <p>
                                También ofrece asesoría nutricional adaptada a las necesidades específicas de esta etapa, ayudando a establecer una dieta equilibrada que favorezca su crecimiento. Además, se brinda orientación sobre los cuidados básicos, educación en hábitos y recomendaciones para el bienestar general de tu mascota, asegurando que su introducción a la vida familiar sea saludable y feliz.
                            </p>
                            <p>
                                Con "Primeros Pasos", tu mascota recibirá la atención que necesita para un desarrollo adecuado, previniendo problemas de salud a largo plazo y fomentando una vida activa y saludable desde su primer año. Es un plan integral para sentar las bases de una vida llena de vitalidad.
                            </p>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header className={style.accordionHeader}>
                            <div className="d-flex align-items-center justify-content-between w-100">
                                <h3 className={style.accordionHeaderTitle}>Madurando</h3>
                                <p className={style.accordionHeaderPrice}>Desde $60000/mes</p>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body className={style.accordionBody}>
                            <p>
                                "Madurando" es un plan veterinario dirigido a mascotas de 5 a 10 años, una etapa crucial donde comienzan a mostrar signos de envejecimiento. Este plan ofrece chequeos regulares para monitorear su salud general, ayudando a detectar a tiempo cualquier problema relacionado con el envejecimiento, como enfermedades cardíacas, articulares o metabólicas.
                            </p>
                            <p>
                                Incluye control de peso y asesoría nutricional, ajustando su dieta a sus necesidades específicas, ayudando a prevenir problemas como la obesidad o deficiencias alimentarias. Además, cubre cuidados dentales, esenciales para evitar problemas orales que podrían afectar su calidad de vida.
                            </p>
                            <p>
                                "Madurando" también enfoca la prevención de enfermedades crónicas con análisis de laboratorio periódicos y un monitoreo constante de su salud. Este plan asegura que tu mascota se mantenga activa y saludable en su adultez, con una atención integral diseñada para promover su bienestar.
                            </p>
                            <p>
                                Con "Madurando", tu mascota recibirá los cuidados necesarios para disfrutar de esta etapa vital con energía y buena salud, previniendo complicaciones y manteniendo su calidad de vida.
                            </p>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header className={style.accordionHeader}>
                            <div className="d-flex align-items-center justify-content-between w-100">
                                <h3 className={style.accordionHeaderTitle}>Adultos</h3>
                                <p className={style.accordionHeaderPrice}>Desde $70000/mes</p>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body className={style.accordionBody}>
                            <p>
                                "Adultos" es un plan veterinario creado para mascotas mayores de 10 años, diseñado para garantizar su bienestar y calidad de vida en su etapa senior. Incluye chequeos geriátricos detallados, con un enfoque en la detección temprana de enfermedades comunes en mascotas mayores, como problemas cardíacos, renales y articulares. También se ofrece manejo del dolor para mejorar su confort y movilidad, así como el control y seguimiento de enfermedades crónicas.
                            </p>
                            <p>
                                El plan abarca cuidados dentales, ya que la salud bucal es fundamental para evitar infecciones y complicaciones en la tercera edad. Además, se proporciona asesoría nutricional avanzada, adaptada a las necesidades específicas de cada mascota, enfocándose en el control de peso y en la selección de dietas adecuadas para prevenir problemas como la obesidad o la pérdida de masa muscular.
                            </p>
                            <p>
                                Con "Adultos", tu mascota recibirá un monitoreo constante de su salud, con el objetivo de brindarle una vida longeva y plena, ayudando a prevenir complicaciones relacionadas con la edad y asegurando que se mantenga activa y cómoda durante sus años dorados.
                            </p>


                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                <Container className="my-5" fluid="md">
                    <h3 className={style.title}>Completa el formulario para que nos pongamos en contacto contigo</h3>
                    <Container fluid="lg" className={style.formContainer}>
                        <FormC variant="plans-information" />
                    </Container>
                </Container>
            </Container>
        </>
    );
}

export default AboutPlans;