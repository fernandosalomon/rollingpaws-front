import { Accordion } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import style from "../styles/AboutPlans.module.css"
import { useForm } from "react-hook-form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import CustomButton from "./shared/CustomButton";

const AboutPlans = () => {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({});

    const onSubmit = (e) => {
        console.log(e)
    }


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
                                <p className={style.accordionHeaderPrice}>Desde $30000</p>
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
                                <p className={style.accordionHeaderPrice}>Desde $60000</p>
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
                                <p className={style.accordionHeaderPrice}>Desde $70000</p>
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
                    <Container fluid="lg">
                        <Form className={style.form}>

                            <Row>
                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-4" controlId="plansFormName">
                                        <Form.Label className={style.formLabel}>Nombre</Form.Label>
                                        <Form.Control type="text" placeholder="Ingresa tu nombre" className={style.formInput} />
                                    </Form.Group>
                                    <Form.Group className="mb-4" controlId="plansFormEmail">
                                        <Form.Label className={style.formLabel}>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Ingresa tu dirección de correo" className={style.formInput} />
                                    </Form.Group>
                                    <Form.Group className="mb-4" controlId="plansFormPhone">
                                        <Form.Label className={style.formLabel}>Teléfono</Form.Label>
                                        <Form.Control type="phone" placeholder="Ingresa tu teléfono" className={style.formInput} />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-3 w-100 " controlId="contactFormLastName">
                                        <Form.Label className={style.formLabel}>Plan que te interesa</Form.Label>

                                        <div className="d-flex gap-1 flex-column">
                                            <Form.Check
                                                inline
                                                type="radio"
                                                label="Primeros Pasos"
                                                name="planes"
                                                value="primeros-pasos"
                                                id="radioBtnPrimerosPasos"
                                                className={style.formCheck}

                                            />
                                            <Form.Check
                                                inline
                                                type="radio"
                                                label="Madurando"
                                                name="planes"
                                                value="madurando"
                                                id="radioBtnMadurando"
                                                className={style.formCheck}

                                            />
                                            <Form.Check
                                                inline
                                                type="radio"
                                                label="Adultos"
                                                name="planes"
                                                value="adultos"
                                                id="radioBtnAdultos"
                                                className={style.formCheck}

                                            />
                                        </div>

                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="plansFormMessage">
                                        <Form.Label className={style.formLabel}>Dejanos un mensaje</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            style={{ height: '105px', resize: "none" }}
                                            name="message"
                                            className={`${style.formInput} p-3`}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    <CustomButton variant="callToAction" className="w-100 mx-auto mt-5">Enviar mensaje</CustomButton>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </Container>
            </Container>
        </>
    );
}

export default AboutPlans;