import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plane, Droplets, Package, FileText, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero shadow-agriculture">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Plane className="h-8 w-8 text-primary-foreground" />
              <h1 className="text-2xl font-bold text-primary-foreground">Wincenter Agriculture</h1>
            </div>
            <Badge variant="secondary" className="bg-agriculture-secondary text-agriculture-earth">
              HD540s Drone System
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-primary-foreground mb-6">
            Sistema de Relatórios de Voo Agrícola
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
            Gerencie seus relatórios de pulverização, voos agrícolas e aplicação de sólidos 
            com precisão e facilidade usando nosso drone HD540s
          </p>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <Button asChild variant="secondary" size="lg" className="bg-agriculture-secondary hover:bg-agriculture-secondary/90">
              <Link to="/pulverizacao">
                <Droplets className="mr-2 h-5 w-5" />
                Relatório de Pulverização
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="bg-agriculture-secondary hover:bg-agriculture-secondary/90">
              <Link to="/voo-agricola">
                <Plane className="mr-2 h-5 w-5" />
                Relatório de Voo Agrícola
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="bg-agriculture-secondary hover:bg-agriculture-secondary/90">
              <Link to="/solido">
                <Package className="mr-2 h-5 w-5" />
                Relatório de Sólido
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-agriculture-light">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
            Por que escolher nosso sistema?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-card-custom border-border/50">
              <CardHeader>
                <Zap className="h-10 w-10 text-agriculture-primary mb-2" />
                <CardTitle>Rapidez e Precisão</CardTitle>
                <CardDescription>
                  Cadastre relatórios em segundos com nosso sistema otimizado
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="shadow-card-custom border-border/50">
              <CardHeader>
                <Shield className="h-10 w-10 text-agriculture-primary mb-2" />
                <CardTitle>Segurança de Dados</CardTitle>
                <CardDescription>
                  Seus relatórios ficam seguros em nossa plataforma confiável
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="shadow-card-custom border-border/50">
              <CardHeader>
                <FileText className="h-10 w-10 text-agriculture-primary mb-2" />
                <CardTitle>Relatórios Completos</CardTitle>
                <CardDescription>
                  Documentação detalhada para controle total das operações
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Reports Dashboard */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
            Últimos Relatórios
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="shadow-card-custom">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Pulverização - Fazenda Norte</CardTitle>
                  <Badge variant="outline" className="text-agriculture-primary border-agriculture-primary">
                    Concluído
                  </Badge>
                </div>
                <CardDescription>
                  HD540s - Área: 150 hectares
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Data: 18/08/2025 • Produto: Herbicida PRO
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card-custom">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Voo Agrícola - Setor B</CardTitle>
                  <Badge variant="outline" className="text-agriculture-secondary border-agriculture-secondary">
                    Em Progresso
                  </Badge>
                </div>
                <CardDescription>
                  HD540s - Monitoramento de cultura
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Data: 19/08/2025 • Altitude: 50m
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card-custom">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Aplicação Sólido - Campo Sul</CardTitle>
                  <Badge variant="outline" className="text-agriculture-primary border-agriculture-primary">
                    Concluído
                  </Badge>
                </div>
                <CardDescription>
                  HD540s - Fertilizante granulado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Data: 17/08/2025 • Quantidade: 500kg
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-agriculture-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Plane className="h-6 w-6" />
            <span className="text-xl font-semibold">Wincenter Agriculture</span>
          </div>
          <p className="text-primary-foreground/80">
            Tecnologia de precisão para agricultura moderna com drone HD540s
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;